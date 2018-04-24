import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SignUp.css';
import { SignInForm } from './SignIn';
import axios from 'axios';

import * as routes from '../constants/routes';
const apiURL = 'http://localhost:5000';
const baseURL = 'https://howd-it-go.firebaseio.com';
const SignUpPage = ({ history }) => (
  <div className="container">
    <SignUpForm history={history} />
    <SignInForm history={history} />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  dbName: ''
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {}

  onSubmit = async event => {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.passwordOne;
    const { history } = this.props;
    let isReady = false;
    const users = [];
    let usernames = [];
    await axios
      .get(`${baseURL}/users.json?shallow=true`)
      .then(res => {
        users.push(res.data);
        usernames = usernames.concat(Object.keys(users[0]));
        if (usernames.includes(username)) {
          alert('Pick a different username');
          this.setState({ username: '' });
        } else {
          isReady = true;
        }
      })
      .catch(err => console.log(err));
    if (isReady)
      axios
        .patch(`${apiURL}/users/${username}`, {
          email,
          password
        })
        .then(res => {
          history.push(routes.SETTINGS);
        })
        .catch(err => console.log(err));
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="form">
        <h1>Sign Up</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <div className="label">Name:</div>
            <input
              value={username}
              onChange={event =>
                this.setState(byPropKey('username', event.target.value))
              }
              type="text"
            />
          </div>
          <div>
            <div className="label">Email Address:</div>
            <input
              value={email}
              onChange={event =>
                this.setState(byPropKey('email', event.target.value))
              }
              type="text"
            />
          </div>
          <div>
            <div className="label">Password:</div>
            <input
              value={passwordOne}
              onChange={event =>
                this.setState(byPropKey('passwordOne', event.target.value))
              }
              type="password"
            />
          </div>
          <div>
            <div className="label">Confirm Password:</div>
            <input
              value={passwordTwo}
              onChange={event =>
                this.setState(byPropKey('passwordTwo', event.target.value))
              }
              type="password"
            />
          </div>

          <button disabled={isInvalid || this.usernameTaken} type="submit">
            Sign Up
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
