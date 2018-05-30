import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SignUp.css';
import { SignInForm } from './SignIn';
import axios from 'axios';

import * as routes from '../constants/routes';

const SignUpPage = ({ history }) => (
  <div className="page"
       style={{
           display: 'flex',


       }}>
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
  displayName: ''
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    const newUser = {
      displayName: this.state.displayName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.passwordOne
    };
    const { history } = this.props;
    axios
      .post(`/signup`, newUser)
      .then(res => {
        if (res.data.message) {
          alert(res.data.message);
        } else {
          alert(
            'All Signed Up! To let us know you are a real person, sign in with your email in password in the Sign In Section please!'
          );
          this.setState({
            displayName: '',
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: ''
          });
        }
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
      <div className="signup">
        <div className="signuphead">Sign Up</div>
        <div className="form">
          <form onSubmit={this.onSubmit}>
            <div>
              <div>Display Name:</div>
              <input
                value={this.state.displayName}
                name="displayName"
                onChange={this.handleChange}
                type="text"
                placeholder="John Doe"
              />
            </div>
            <div>
              <div>Username:</div>
              <input
                value={this.state.username}
                name="username"
                onChange={this.handleChange}
                type="text"
                placeholder="JohnDoe01"
              />
            </div>
            <div>
              <div>Email Address:</div>
              <input
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
                type="email"
                placeholder="John@Doe.com"
              />
            </div>
            <div>
              <div>Password:</div>
              <input
                value={this.state.passwordOne}
                name="passwordOne"
                onChange={this.handleChange}
                type="password"
                placeholder="Must be six or more characters"
              />
            </div>
            <div>
              <div>Confirm Password:</div>
              <input
                value={this.state.passwordTwo}
                name="passwordTwo"
                onChange={this.handleChange}
                type="password"
                placeholder="Confirm Password"
              />
            </div>

            <button disabled={isInvalid || this.usernameTaken} type="submit">
              Sign Up
            </button>

            {error && <p>{error.message}</p>}
          </form>
        </div>
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
