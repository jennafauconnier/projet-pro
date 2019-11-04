import React, { Component } from 'react';
import './SignUp.scss';

class SignUp extends Component {
  state = {
    username : '',
    password : ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  postSignUp = () => {
    console.log("PROPS", this.props)
    console.log('in post signup')
    const { username, password } = this.state
    console.log("CRED", { username, password })
    const body = JSON.stringify({ username, password })
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    console.log("before fetching")

    fetch('http://localhost:4332/users/signup', {
      method : 'POST',
      headers,
      body
    })
    .then(res => {
      console.log("RESULT AFTER SIGN UP", res)
      return res.json()
    })
    .then(() => {
      console.log("GET CREDS AND LOG IN", body, headers)
      // return fetch('http://localhost:4332/users/signin', {
      //   method : 'POST',
      //   headers,
      //   body
      // })
      return "toto"
    })
    .then(() => {
      // if (res.status !== 200) {
      //   throw new Error('Invalid credentials');
      // }
      // return res.json();
      console.log("kikoulol")
      return "you"
    })
    .then(() => {
      // this.props.setToken(data.token)
      // this.props.onSuccess(data);
      console.log("normally there is save the token")
      return "toto"
    })
    .catch(err => console.warn(err))
  }

  render() {
    console.log(this.state);
    return(
      <>
        <div className="sign-up_content">
          <div className="sign-up_title">
            <h2>Sign Up</h2>
          </div>
          <form className="sign-up_form" onSubmit={this.postSignUp}>
            <div className="sign-up_form-element sign-up_form-username">
              <input type="text" name="username" required placeholder="Username" value={this.state.username} onChange={this.handleChange}></input>
            </div>
            <div className="sign-up_form-element sign-up_form-password">
              <input type="password" name="password" required placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>
            </div>
            <div className="sign-up_form-element sign-up_form-password">
              <input type="password" name="confirmed_password" required placeholder="Confirmed password"></input>
            </div>
            <div className="sign-up_button">
              <button className="sign-up_submit" value="Sign Up" type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </>
    )
  }
}

export default SignUp