import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SignUp.css';
import { SignUpForm } from './SignUpForm';
import { Container, Row, Col } from 'reactstrap';

import * as routes from '../constants/routes';

const SignUpPage = ({ history }) => (
  <div className="page"
       style={{
           display: 'flex',


       }}>
      <Container className="formContainer">
          <Row>
              <Col>
                  <Row>
                      <Col className="silogo silogo-sm" sm="12" md={{ size: 6, offset: 3 }}><i className="fa fa-code fa-lg"></i></Col>
  <SignInLink />
                  </Row>

    <SignUpForm history={history} />
              </Col>
          </Row>
      </Container>

  </div>
);

const SignInLink = () => (
  <p>
    Already have an account? <Link to={routes.SIGN_IN}>Sign In</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpLink };
