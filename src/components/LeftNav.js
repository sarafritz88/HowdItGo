import React from 'react';
import { Link } from 'react-router-dom';
import './leftNav.css';
import 'font-awesome/css/font-awesome.min.css';
import PropTypes from 'prop-types';


import * as routes from '../constants/routes';



const LeftNavigation = (props, { authUser }) =>
    <div class="lnavcontainer">
    <ul class="leftNav">

        <div>
        <li><i className="fa fa-code fa-lg fa-spin"></i></li>
        </div>
        <div>
            <li>HowdItGo</li>
        </div>
        <div>
            <li class="push"><Link to={routes.INVITE}>Invite</Link></li>
        </div>
        <div>
        <li><Link to={routes.STATS}>Stats</Link></li>
        </div>
        <div>
            <li><Link to={routes.SETTINGS}>Settings</Link></li> </div>
        <div>
        <li><Link to={routes.PASSWORD}>Password Settings</Link></li>
        </div>
    </ul>
    </div>
LeftNavigation.contextTypes = {
    authUser: PropTypes.object,
};

export default LeftNavigation;