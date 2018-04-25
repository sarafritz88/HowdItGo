import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ComingSoonPage from './comingsoon';
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import AccountPage from './Account';
import PasswordPage from './Password';
import InvitePage from './invite';
import SettingsPage from './Settings';
import StatsPage from './Stat';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as routes from '../constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />

      <Route exact path={routes.COMINGSOON} component={() => <ComingSoonPage />} />
      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />}/>
      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.PASSWORD} component={() => <PasswordPage />} />
      <Route exact path={routes.INVITE} component={() => <InvitePage />} />
      <Route exact path={routes.SETTINGS} component={() => <SettingsPage />} />
      <Route exact path={routes.STATS} component={() => <StatsPage />} />
    </div>
  </Router>
);
export default App;
