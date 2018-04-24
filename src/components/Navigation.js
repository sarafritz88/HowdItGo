import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './navigation.css';
import 'font-awesome/css/font-awesome.min.css';


import SignOutButton from './SignOut';

import * as routes from '../constants/routes';

const Navigation = (props, { authUser }) =>
    <div>
        { authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </div>
Navigation.contextTypes = {
    authUser: PropTypes.object,
};

const NavigationAuth = () =>
    <ul>
        <li><i className="fa fa-code fa-lg fa-spin"> </i></li>
        <li>HowdItGo</li>
        <li class="logo"><Link to={routes.LANDING}>Landing</Link></li>
        <li><Link to={routes.HOME}>Home</Link></li>
        <li><Link to={routes.ACCOUNT}>Account</Link></li>
        <li><SignOutButton /></li>

    </ul>

const NavigationNonAuth = () =>
    <ul>
        <li><i className="fa fa-code fa-lg fa-spin"></i></li>
        <li>HowdItGo</li>
        <li class="logo"><Link to={routes.SIGN_UP}>Sign In</Link></li>
        <li><Link to={routes.LANDING}>Landing</Link></li>

    </ul>

export default Navigation;