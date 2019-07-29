import React, { Component } from 'react';
import './SignUp.scss';

class SignUp extends Component {
  state = {
    username : '',
    password : ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.id] : e.target.value });
  }

  postSignUp = (username, password) => {
    const body = JSON.stringify({ username, password })
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    fetch('http://localhost:4332/users/signup', {
      method : 'POST',
      headers,
      body
    })
    .then(res => res.json())
    .then(data => {
      if (data === 'success') {
        this.setState({ username : '', password : '' });
        window.location = '/';
      }
    })
    .catch(err => console.warn(err))
  }

  render() {
    console.log(this.props);
    return(
      <>
      <div className="login_sign-up">
        <div className="sign-up_content">
          <div className="sign-up_title">
            <h2>Sign Up</h2>
          </div>
          <form className="sign-up_form">
            <div className="sign-up_form-element sign-up_form-username">
              <input type="text" id="username" name="username" required placeholder="Username" value={this.state.username} onChange={this.handleChange}></input>
            </div>
            <div className="sign-up_form-element sign-up_form-password">
              <input type="password" id="password" name="password" required placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>
            </div>
            <div className="sign-up_form-element sign-up_form-password">
              <input type="password" id="confirmed_password" name="confirmed_password" required placeholder="Confirmed password"></input>
            </div>
          </form>
          <div className="sign-up_button">
            <button className="sign-up_submit" value="Sign Up" onClick={() => this.postSignUp(this.state.username, this.state.password)}>Sign Up</button>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default SignUp