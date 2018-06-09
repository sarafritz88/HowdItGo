import React from 'react';
import LeftNavigation from './LeftNav';

import PasswordChange from './PasswordChange';
import Billing from './Billing'; // Work in Progress

import './account.css';

export default class AccountPage extends React.Component {
  render() {
    return (
        <div className = "page">
      <div className="acc content">
        <div>
          <LeftNavigation />
        </div>
        <PasswordChange />
      </div>
        </div>
    );
  }
}
