import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
    <div>

        <SignInForm history={history} />
        <PasswordForgetLink />
        <SignUpLink />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div className="form">
            <h1>Sign In</h1>
            <form onSubmit={this.onSubmit}>

                <div>
                    <div className="label">
                        Email Address:
                    </div>
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"

                />
                </div>
                <div>
                    <div className="label">
                        Password:
                    </div>
                <input
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"

                />
                </div>
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>
                <PasswordForgetLink />

                { error && <p>{error.message}</p> }
            </form>
            </div>
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm,
};