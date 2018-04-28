import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import './Settings.css';
import LeftNavigation from './LeftNav';

//const urlShortener = 'https://5ly.me/api/shorten.php?url=';
const apiURL = 'http://localhost:5000';

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
    const sessionCookie = localStorage.getItem('sessionCookie');

    if (!sessionCookie) {
      console.log('Wot you doin mate? Wheres yer cookie?');
      this.props.history.push('/signup');
      return;
    }
  }

  handleSubmit = event => {
    const email = localStorage.getItem('email');
    const managerName = this.state.managerName;
    const messageContent = this.state.messageContent;
    const businessName = this.state.businessName;
    if (managerName === '' || messageContent === '' || businessName === '') {
      return;
    };
    event.preventDefault();
    axios
      .post(`${apiURL}/settings`, {email, managerName, messageContent, businessName})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="page">
        <div>
          <LeftNavigation />
        </div>
        <div className="content" style={{ width: '100%' }}>
          <form
            action="submit"
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
              required
            />
            <label>Business Name</label>
            <input
              name="businessName"
              type="text"
              placeholder="John's Auto Shop"
              onChange={this.handleChange}
              required
            />
            <label>Review Site URL</label>
            <input
              name="managerName"
              type="text"
              placeholder="www.google.com/places/johnsautoshop"
              onChange={this.handleChange}
              //required
            />
            <label>Message Content</label>
            <textarea
              name="messageContent"
              type="text"
              placeholder="Nice message content"
              onChange={this.handleChange}
              required
            />
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SettingsPage);
