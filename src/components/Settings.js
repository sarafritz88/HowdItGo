import React from 'react';
import axios from 'axios';

import './Settings.css';

const urlShortener = 'https://5ly.me/api/shorten.php?url=';
const baseURL = 'https://localhost:5000';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      managerName: '',
      businessName: '',
      currentReviewSite: '',
      allReviewSites: [],
      messageContent: '',
      oldPassword: '',
      newPassword: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <form
          action="submit"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '40%'
          }}
        >
          <label>Manager Name</label>
          <input
            name="managerName"
            type="text"
            placeholder="John"
            onChange={this.handleChange}
          />
          <label>Business Name</label>
          <input
            name="businessName"
            type="text"
            placeholder="John's Auto Shop"
            onChange={this.handleChange}
          />
          <label>Review Site URL</label>
          <input
            name="managerName"
            type="text"
            placeholder="www.google.com/places/johnsautoshop"
            onChange={this.handleChange}
          />
          <label>Message Content</label>
          <textarea
            name="messageContent"
            type="text"
            placeholder="Nice message content"
            onChange={this.handleChange}
          />
          <label>Old Password</label>
          <input
            name="oldPassword"
            type="text"
            placeholder="********"
            onChange={this.handleChange}
          />
          <label>New Password</label>
          <input
            name="newPassword"
            type="text"
            placeholder="********"
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
