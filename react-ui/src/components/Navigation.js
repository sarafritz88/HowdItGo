import React from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import SignOutButton from './SignOut';

import * as routes from '../constants/routes';
import {Col, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row} from "reactstrap";


const Navigation = () =>(


<div>
  <Navbar>
    <Container>

    <NavbarBrand>
      <Link to={routes.LANDING}><i className="fa fa-code fa-lg fa-spin" /> HowdItGo</Link></NavbarBrand>
      <Nav navbar>
        <NavItem>
          <Link to={routes.ACCOUNT}>Account</Link>
        </NavItem>
        <NavItem>
          <Link to={routes.DASHBOARD}>Dashboard</Link>
        </NavItem>
      </Nav>

    </Container>
  </Navbar>
</div>
);

export default Navigation;