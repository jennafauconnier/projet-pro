import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

class Header extends Component {
  render() {
    return (
        <div className="Header">
            <div className="chat_logo">
                <p>DIRECT ASSURANCE CHAT</p>
            </div>
            {/* <div className="chat_text-intro">
                <h1>Choose your pic</h1>
            </div> */}
            <div className="chat_login">
                <Link to='/login'><button className="chat_login-button">Login</button></Link>
            </div>
        </div>
    );
  }
}

export default Header;