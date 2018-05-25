import React, {
  Component
} from 'react';
import axios from 'axios';

export default class PasswordChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      passwordOne: '',
      passwordTwo: ''
    };
  }

  componentDidMount() {
    const cookie = localStorage.getItem('sessionCookie');
    if (!cookie) {
      this.props.history.push('/signup');
      return;
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.passwordOne !== this.state.passwordTwo) {
      alert("Passwords don't match!");
      this.setState({
        passwordOne: '',
        passwordTwo: '',
        username: ''
      });
      return;
    } else {
      axios
        .post('/update-user', {
          username: this.state.username,
          password: this.state.passwordOne
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  };

  render() {
    const {
      passwordOne,
      passwordTwo,
      username
    } = this.state;

    const isInvalid =
      passwordOne === '' || passwordTwo === '' || username === '';

    return ( <
      div className = "form" >
      <
      form onSubmit = {
        this.onSubmit
      } >
      <
      div >
      <
      div className = "label" > Username: < /div> <
      input value = {
        username
      }
      onChange = {
        this.handleChange
      }
      type = "text"
      name = "username"
      placeholder = "Username" /
      >
      <
      /div> <
      div >
      <
      div className = "label" > New Password: < /div> <
      input value = {
        passwordOne
      }
      onChange = {
        this.handleChange
      }
      type = "password"
      name = "passwordOne"
      placeholder = "New Password" /
      >
      <
      /div> <
      div >
      <
      div className = "label" > Confirm Password: < /div> <
      input value = {
        passwordTwo
      }
      onChange = {
        this.handleChange
      }
      type = "password"
      name = "passwordTwo"
      placeholder = "Confirm Password" /
      >
      <
      /div> <
      button disabled = {
        isInvalid
      }
      type = "submit" >
      Submit <
      /button> <
      /form> <
      /div>
    );
  }
}