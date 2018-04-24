import React from 'react';

import PasswordChangeForm from './PasswordChange';
import LeftNavigation from './LeftNav'
import './password.css';

const PasswordPage = () =>
    <div class ="page">
        <div>
            <LeftNavigation />
        </div>
        <div class="content">
            <div>

                <h3>Password Change</h3>
            </div>

            <PasswordChangeForm />
        </div>
    </div>

export default PasswordPage;