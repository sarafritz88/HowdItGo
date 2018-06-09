import React from 'react';
import LeftNavigation from './LeftNav';
import axios from 'axios';
import './Stat.css';
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
      return;
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
    await axios
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
      <body id="invitePage">
        <div className="page">
          <div>
            <LeftNavigation />
          </div>
          <div
            className="content"
            style={{
              display: 'flex',

            }}
          >
            <div className="left">
              <h1>Customer Info</h1>
              Enter your customers first name, last name and phone number to
              send them an invitation to leave a review.
            </div>
            <div
              className="inviteBox"
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div>
                <label> Customer First Name: </label>

                <input
                  placeholder="First Name"
                  name="firstName"
                  value={this.state.firstName}
                  type="text"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Customer Last Name: </label>
                <input
                  placeholder="Last Name"
                  name="lastName"
                  value={this.state.lastName}
                  type="text"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Customer Phone Number: </label>
                <input
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  type="text"
                  onChange={this.handleChange}
                />
              </div>

              <button className="short" onClick={this.handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default InvitePage;
