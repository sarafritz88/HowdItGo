import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { auth, db } from '../firebase';
import './SignUp.css';
import { SignInForm } from './SignIn';


import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
    <div class="container">
        <SignUpForm history={history} />
        <SignInForm history={history} />
    </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                db.doCreateUser(authUser.uid, username, email)
                    .then(() => {
                        this.setState(() => ({ ...INITIAL_STATE }));
                        history.push(routes.HOME);
                    })
                    .catch(error => {
                        this.setState(byPropKey('error', error));
                    });

            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {

            const {
                username,
                email,
                passwordOne,
                passwordTwo,
                error,
            } = this.state;

            const isInvalid =
                passwordOne !== passwordTwo ||
                passwordOne === '' ||
                email === '' ||
                username === '';

            return (

                <div class="form">
                    <h1>Sign Up</h1>
                <form onSubmit={this.onSubmit}>
            <div>
                        <div class="label">
                            Name:
                        </div>
                    <input
                        value={username}
                        onChange={event => this.setState(byPropKey('username', event.target.value))}
                        type="text"

                    />
                    </div>
                    <div>
                        <div class="label">
                            Email Address:
                        </div>
                    <input
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"

                    />
                    </div>
                    <div>
                        <div class="label">
                            Password:
                        </div>
                    <input
                        value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        type="password"

                    />
                    </div>
                    <div>
                        <div class="label">
                            Confirm Password:
                        </div>
                    <input
                        value={passwordTwo}
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        type="password"

                    />
                    </div>

                        <button disabled={isInvalid} type="submit">
                        Sign Up
                    </button>


                    { error && <p>{error.message}</p> }

                </form>
                </div>
            );
        }
    }

const SignUpLink = () =>
    <p>
        Don't have an account?
        {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
};