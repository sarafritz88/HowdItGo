import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import axios from 'axios';

const apiURL = 'http://localhost:5000';

const SignInPage = ({ history }) => (
  <div>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    localStorage.getItem('sessionCookie');
    if (localStorage.getItem('sessionCookie')) {
      localStorage.removeItem('sessionCookie');
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { history } = this.props;
    axios
      .post(`${apiURL}/signin`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(result => {
        if (result.data.message) {
          alert(result.data.message);
          return;
        } else {
          localStorage.setItem('sessionCookie', result.data.sessionCookie);
          localStorage.setItem('email', this.state.email);
          history.push('/Settings');
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="form">
        <h2>Sign In</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <div className="label">email:</div>
            <input
              value={email}
              onChange={this.handleChange}
              type="email"
              name="email"
            />
          </div>
          <div>
            <div className="label">Password:</div>
            <input
              value={password}
              onChange={this.handleChange}
              type="password"
              name="password"
            />
          </div>
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>
          <PasswordForgetLink />

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
