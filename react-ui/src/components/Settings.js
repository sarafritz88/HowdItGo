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
      .catch(error => console.log(error));
  }

  deleteSite = site => {
    let sites = this.state.allReviewSites;
    let siteIndex = sites.indexOf(site);
    sites.splice(siteIndex, 1);
    this.setState({ ...this.state, allReviewSites: sites });
  };

  handleSubmit = event => {
    const email = localStorage.getItem('email');
    const sites = this.state.allReviewSites;
    const managerName = this.state.managerName;
    const messageContent = this.state.messageContent;
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
    event.preventDefault();
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

  render() {
    return (
      <div className="page">
        <div>
          <LeftNavigation />
        </div>
        <div className="content" style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <label>Manager Name</label>
            <input
              name="managerName"
              type="text"
              placeholder="John Doe"
              onChange={this.handleChange}
              value={this.state.managerName}
              required
            />
            <label>Business Name</label>
            <input
              name="businessName"
              type="text"
              placeholder="John's Auto Shop"
              onChange={this.handleChange}
              value={this.state.businessName}
              required
            />
            <label>Review Site URL</label>
            <input
              name="currentReviewSite"
              type="text"
              placeholder="www.google.com/places/johnsautoshop"
              onChange={this.handleChange}
              value={this.state.currentReviewSite}
              //required
            />
            <button
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
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}
                  >
                    <p>{site}</p>
                    <button
                      style={{ height: '25px', width: '25px' }}
                      onClick={() => this.deleteSite(site)}
                    >
                      X
                    </button>
                  </div>
                );
              })
            ) : (
              <p>Nothing Added yet</p>
            )}
            <label>Message Content</label>
            <textarea
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
    );
  }
}

export default withRouter(SettingsPage);
