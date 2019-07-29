import React, { Component } from 'react';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import './Login.scss';


class Login extends Component {
  componentDidMount() {
    fetch('http:localhost:4332/users')
    .then(res => res.json())
    .catch(err => console.log(err))
  }

  onSignInSuccess = () => {
    this.props.history.push('/');
  }

  render() {
    console.log(this.props)
    return(
      <div className="login_content">
        <SignUp />
        <SignIn onSuccess={this.onSignInSuccess}/>
      </div>
    )
  }
}

export default Login;