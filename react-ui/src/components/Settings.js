import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import './Settings.css';
import LeftNavigation from './LeftNav';

//const urlShortener = 'https://5ly.me/api/shorten.php?url=';

export class SettingsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      managerName: '',
      businessName: '',
      currentReviewSite: '',
      allReviewSites: [],
      messageContent: ''
    };
  }

  async componentDidMount() {
    const sessionCookie = await localStorage.getItem('sessionCookie');
    const email = await localStorage.getItem('email');
    if (!sessionCookie) {
      this.props.history.push('/signup');
      return;
    }
    axios
      .post(`/settings/user_settings`, { email })
      .then(response => {
        this.setState({
          ...this.state,
          businessName: response.data.businessName || '',
          managerName: response.data.managerName || '',
          messageContent: response.data.messageContent || '',
          allReviewSites: response.data.sites || []
        });
      })
      .then(() => {
        this.setState({
          ...this.state,
          messageContent: this.modifyMessageContentFromDB(
            this.state.messageContent
          )
        });
      })
      .catch(error => console.log(error));
  }

  deleteSite = site => {
    let sites = this.state.allReviewSites;
    let siteIndex = sites.indexOf(site);
    sites.splice(siteIndex, 1);
    this.setState({ ...this.state, allReviewSites: sites });
  };

  handleSubmit = async event => {
    const email = await localStorage.getItem('email');
    const sites = this.state.allReviewSites;
    const managerName = this.state.managerName;
    let messageContent = this.state.messageContent;
    const businessName = this.state.businessName;
    if (
      managerName === '' ||
      messageContent === '' ||
      businessName === '' ||
      !sites.length
    ) {
      alert('Please fill out all fields and add at least 1 Review URL');
      return;
    }
    messageContent = await this.modifyMessageContentToDB(messageContent);
    axios
      .post(`/settings`, {
        email,
        managerName,
        messageContent,
        businessName,
        sites
      })
      .then(res => {
        alert('Settings Updated!');
      })
      .catch(err => console.log(err));
  };

  addSite = site => {
    let sites = this.state.allReviewSites;
    if (site === '') {
      alert(`Can't add a blank site! Please add a valid website!`);
      return;
    }
    let newSites = [...sites, site];
    this.setState({
      ...this.state,
      allReviewSites: newSites,
      currentReviewSite: ''
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  modifyMessageContentToDB = message => {
    const manager = /<manager name>/gi;
    const businessName = /<business name>/gi;
    const link = /<link>/gi;
    let newMessage = message.replace(
      new RegExp(manager, 'g'),
      this.state.managerName
    );
    newMessage = newMessage.replace(
      new RegExp(businessName, 'g'),
      this.state.businessName
    );
    newMessage = newMessage.replace(
      new RegExp(link, 'g'),
      this.state.allReviewSites[0]
    );
    return newMessage;
  };

  modifyMessageContentFromDB = message => {
    const manager = this.state.managerName;
    const businessName = this.state.businessName;
    const link = this.state.allReviewSites[0];
    let newMessage = message.replace(
      new RegExp(manager, 'g'),
      '<manager name>'
    );
    newMessage = newMessage.replace(
      new RegExp(businessName, 'g'),
      '<business name>'
    );
    newMessage = newMessage.replace(new RegExp(link, 'g'), '<link>');
    return newMessage;
  };

  render() {
    return (
      <div className="page">
        <div>
          <LeftNavigation />
        </div>
        <div className="content" >

          <div
              style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center'
              }}
          >
            <div className="leftS">
            <label>Manager Name:</label>
            <input
              name="managerName"
              type="text"
              placeholder="John Doe"
              onChange={this.handleChange}
              value={this.state.managerName}
              required
            />
            <label>Business Name:</label>
            <input
              name="businessName"
              type="text"
              placeholder="John's Auto Shop"
              onChange={this.handleChange}
              value={this.state.businessName}
              required
            />
            <label>Review Site URL:</label>
            <input
              name="currentReviewSite"
              type="text"
              placeholder="www.google.com/places/johnsautoshop"
              onChange={this.handleChange}
              value={this.state.currentReviewSite}
            />
            <button
                style={{ height: '5vh'}}
              title="Add Site"
              onClick={() => this.addSite(this.state.currentReviewSite)}
            >
              Add Site
            </button>
            {this.state.allReviewSites ? (
              this.state.allReviewSites.map((site, index) => {
                return (
                  <div
                    key={`${site}${index}`}

                  >
                    <p1>{site}
                    <button
                      style={{ height: '3vh', width: '3vh' }}
                      onClick={() => this.deleteSite(site)}
                    >
                      X
                    </button></p1>
                  </div>
                );
              })
            ) : (
              <p>No Sites Yet</p>
            )}



            </div>

            <div className="rightS">

            <label>Message Content: </label>
              Customize the message your customer receives. You do not need to add the review site to this section.
            <textarea
  id="messageContent"
              name="messageContent"
              type="text"
              placeholder="Nice message content"
              onChange={this.handleChange}
              value={this.state.messageContent}
              required
            />
            <button onClick={this.handleSubmit}>Submit</button>

          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(SettingsPage);
