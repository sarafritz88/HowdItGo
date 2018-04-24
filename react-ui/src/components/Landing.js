import React from 'react';
import './landing.css';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div>
    <div className="top">
      <h1>Help Your Business Stand Out</h1>
      <h2>Let Your Customers Share Their Experience</h2>
      <button className="b1">
        <span>
          <Link to={routes.SIGN_UP}> Get Started</Link>
        </span>
      </button>
    </div>
    <div className="lower">
      <h3>
        {' '}
        Gaining customer feedback and online review management has never been
        easier.{' '}
      </h3>
      <h4>
        Easily drive reviews of your business and improve customer service with
        HowdItGo Customer Interaction Software.{' '}
      </h4>
    </div>
  </div>
);

export default LandingPage;
