import React from 'react';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';

const PasswordPage = () =>
    <div>
        <h1>Password Page</h1>
        <div>
            <PasswordForgetForm />
        </div>
        <div>
            <PasswordChangeForm />
    </div>
    </div>

export default PasswordPage;