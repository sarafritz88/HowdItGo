import React from 'react';
import './signout.css';

import { auth } from '../firebase';

const SignOutButton = () =>
    <button className="button"
        type="button"
        onClick={auth.doSignOut}
    >
        Sign Out
    </button>

export default SignOutButton;