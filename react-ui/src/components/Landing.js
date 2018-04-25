import React from 'react';
import './landing.css';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import 'font-awesome/css/font-awesome.min.css';



const LandingPage = () =>
    <div className="container">
        <div className="overlay">
        <div className="top">
            <h1 className="text"> HowdItGo </h1>
        <h6>Customer Feedback and Review Management</h6>
            <h3>Let Your Customers Share Their Experience</h3>

        </div>
            <div className="lower">
                <div className="left">
                    <div className="box"><div className="speech-bubble">
                        <i class="fa fa-star fa-3x"> </i>
                        <i class="fa fa-star fa-3x"> </i>
                        <i class="fa fa-star fa-3x"> </i>
                        <i class="fa fa-star fa-3x"> </i>
                        <i class="fa fa-star fa-3x"> </i>

                    </div>  <div className="message-dots">
                        <div className="dot-1"></div>
                        <div className="dot-2"></div>
                        <div className="dot-3"></div>
                    </div></div>
                </div>
                <div className="right">
<p>
                <h4> Gaining customer feedback and online review management has never been easier.  </h4>
                <h4>Easily drive reviews of your business and improve customer service with HowdItGo Customer Interaction Software. </h4>
</p>
                    <button className="button-two"><span><Link to={routes.SIGN_UP}> Get Started</Link></span></button>
                </div>
            </div>
        </div>
        </div>
=======

const LandingPage = () =>
    <div>
        <div class="top">
        <h1>Help Your Business Stand Out</h1>
            <h2>Let Your Customers Share Their Experience</h2>
            <button class="b1"><span><Link to={routes.SIGN_UP}> Get Started</Link></span></button>
        </div>
        <div class="lower">
            <h3> Gaining customer feedback and online review management has never been easier.  </h3>
            <h4>Easily drive reviews of your business and improve customer service with HowdItGo Customer Interaction Software. </h4>
        </div>
    </div>
>>>>>>> 6331c7791f598e6232617fd6d882d8b35854b66a


export default LandingPage;