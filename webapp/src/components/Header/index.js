import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import logo from './evengers.jpg'

class Header extends Component {
  render() {
    return (
        <div className="Header">
                <img src={logo} alt="evengers" />
            <div className="chat_login">
                <Link to='/login'><button className="chat_login-button">Login</button></Link>
            </div>
        </div>
    );
  }
}

export default Header;