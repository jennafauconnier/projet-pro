import React, { Component } from 'react';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import { connect } from 'react-redux';
import { setToken } from '../../redux/actions';
import './Login.scss';


class Login extends Component {
  componentDidMount() {
    this.props.setToken(undefined)
  }

  onSignInSuccess = () => {
    this.props.history.push('/');
  }

  render() {
    return(
      <div className="login_content">
        <SignUp />
        <SignIn onSuccess={this.onSignInSuccess}/>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setToken: setToken,
}

export default connect(undefined, mapDispatchToProps)(Login);