import React from 'react';
import LeftNavigation from './LeftNav';
import axios from 'axios';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

class InvitePage extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    messageContent: ''
  };

  validatePhoneNumber(phoneNumber) {
    try {
      const phoneUtil = PhoneNumberUtil.getInstance();

      if (phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber))) {
        return phoneUtil.format(
          phoneUtil.parse(phoneNumber),
          PhoneNumberFormat.E164
        );
      }
    } catch (e) {
      return e;
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSend = async () => {
    const email = await localStorage.getItem('email');
    const { firstName, lastName, phoneNumber, messageContent } = this.state;
    const messageDetails = {
      firstName,
      lastName,
      phoneNumber: this.validatePhoneNumber(`+1${phoneNumber}`),
      messageContent,
      email
    };
    if (!messageContent.length) {
      alert('Go to Settings and add a nice message to your customers!');
    }
    axios
      .post('/message-user', messageDetails)
      .then(response => {
        alert('Message Sent!');
        this.setState({ firstName: '', lastName: '', phoneNumber: '' });
      })
      .catch(err => console.log(err));
  };

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
          messageContent: response.data.messageContent || ''
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="page">
        <div>
          <LeftNavigation />
        </div>
        <div className="content">
          <h2>Customer Info</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <input
              placeholder="Customer first name"
              name="firstName"
              value={this.state.firstName}
              type="text"
              onChange={this.handleChange}
            />
            <input
              placeholder="Customer last name"
              name="lastName"
              value={this.state.lastName}
              type="text"
              onChange={this.handleChange}
            />
            <input
              placeholder="Customer phone number"
              name="phoneNumber"
              value={this.state.phoneNumber}
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleSend}>Send</button>
        </div>
      </div>
    );
  }
}

export default InvitePage;
