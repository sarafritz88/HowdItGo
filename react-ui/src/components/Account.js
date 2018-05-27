import React from 'react';
import LeftNavigation from './LeftNav';

import PasswordChange from './PasswordChange';

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
        <div>Billing Section</div>
      </div>
        </div>
    );
  }
}
