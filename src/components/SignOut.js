import React from 'react';
import './signout.css';

import { auth } from '../firebase';

const SignOutButton = () =>
    <button class="button1"
        type="button"
        onClick={auth.doSignOut}
    >
        Sign Out
    </button>

export default SignOutButton;