import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken } from '../../redux/actions';
import './SignIn.scss';


class SignIn extends Component {
  state = {
    username : '',
    password : '',
  }

  checkLocalStorage = () => {
    const username = localStorage.getItem("username");
    if (username) {
      this.setState({ username });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  postSignIn = (username, password) => {
    const body = JSON.stringify({ username, password })
    const headers = {
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    }
    fetch('http://localhost:4332/users/signin', {
      method : 'POST',
      headers,
      body
    })
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Invalid credentials');
      }
      return res.json();
    })
    .then(data => {
      this.props.setToken(data.token)
      this.props.onSuccess(data);
    })
    .catch(err => window.alert(err))
  }

  render() {
    return(
      <div className="login_sign-in">
          <div className="sign-in_content">
              <div className="sign-in_title">
                  <h2>Sign in</h2>
              </div>
              <form className="sign-in_form">
                  <div className="sign-in_form-element sign-in_form-username">
                      <label>Username</label>
                      <input type="text" id="username" name="username" required placeholder="Enter username" value={this.state.username} onChange={this.handleChange}></input>
                  </div>
                  <div className="sign-in_form-element sign-in_form-password">
                      <label>Password</label>
                      <input type="password" id="password" name="password" required placeholder="Enter password" value={this.state.password} onChange={this.handleChange}></input>
                  </div>
              </form>
              <div className="sign-in_button">
                  <button className="sign-in_submit" value="Signin" onClick={() => this.postSignIn(this.state.username, this.state.password)}>Sign in</button>
              </div>
          </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setToken: setToken,
}

export default connect(undefined, mapDispatchToProps)(SignIn);