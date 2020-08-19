import React from 'react';

import './SignDropDown.scss';

import axios from 'axios';

import Cookies from 'js-cookie';

import CustomButton from './custom-button.jsx';

import FormInput from './form-input.jsx';

class CartDropdown extends React.Component {
  constructor(props) {
    super(props);
    console.log('props are: ', props);
    this.state = {
      emailIn: '',
      passwordIn: '',
      emailUp: '',
      passwordUp: '',
      firstname: '',
      lastname: '',
      profilephoto: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
  }

  handleSignInSubmit() {
    event.preventDefault();
    const data = { email: this.state.emailIn, password: this.state.passwordIn };
    console.log('data is: ', data);
    // fetch('http://localhost:3000/api/regularSignIn', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    axios
      .post('http://localhost:3000/api/regularSignIn', data)
      .then((response) => {
        console.log('response.data is', response.data);
        Cookies.set('user', response.data.cookie);
        const userName = this.state.emailIn;
        this.setState({
          ...this.state,
          emailIn: '',
          passwordIn: '',
        });
        this.props.hideAfterSignInOrUp();
        this.props.handleStatusChange(userName);
      })
      .catch((err) => {
        console.log('Error during making post request for SignIn: ', err);
      });
  }

  handleSignUpSubmit() {
    event.preventDefault();
    const {
      emailUp,
      passwordUp,
      firstname,
      lastname,
      profilephoto,
    } = this.state;
    const data = {
      email: emailUp,
      password: passwordUp,
      firstname,
      lastname,
      profilephoto,
    };

    axios
      .post('http://localhost:3000/api/regularSignUp', data)
      .then((response) => {
        console.log('response.data is', response.data);
        Cookies.set('user', response.data.cookie);
        const userName = this.state.emailUp;
        this.setState({
          ...this.state,
          emailUp: '',
          passwordUp: '',
          firstname: '',
          lastname: '',
          profilephoto: '',
        });
        this.props.hideAfterSignInOrUp();
        this.props.handleStatusChange(userName);
      })
      .catch((err) => {
        console.log('Error during making post request for SignUp: ', err);
      });
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="dropdown">
        <div className="inputs-field">
          <form onSubmit={this.handleSignInSubmit}>
            <FormInput
              name="emailIn"
              type="email"
              label="Email"
              value={this.state.emailIn}
              handleChange={this.handleChange}
              required
            />
            <FormInput
              name="passwordIn"
              type="password"
              label="Password"
              value={this.state.passwordIn}
              handleChange={this.handleChange}
              required
            />
            <CustomButton type="submit">Sign In!</CustomButton>
          </form>
        </div>
        <div className="inputs-field bigger">
          <form onSubmit={this.handleSignUpSubmit}>
            <FormInput
              name="emailUp"
              type="email"
              label="Email"
              value={this.state.emailUp}
              handleChange={this.handleChange}
              required
            />
            <FormInput
              name="passwordUp"
              type="password"
              label="Password"
              value={this.state.passwordUp}
              handleChange={this.handleChange}
              required
            />
            <FormInput
              name="firstname"
              type="text"
              label="Your First Name"
              value={this.state.firstname}
              handleChange={this.handleChange}
              required
            />
            <FormInput
              name="lastname"
              type="text"
              label="Your Last Name"
              value={this.state.lastname}
              handleChange={this.handleChange}
              required
            />
            <FormInput
              name="profilephoto"
              type="text"
              label="Your Profile Photo URL"
              value={this.state.profilephoto}
              handleChange={this.handleChange}
              required
            />
            <CustomButton type="submit">Sign Up!</CustomButton>
          </form>
        </div>
      </div>
    );
  }
}

export default CartDropdown;
