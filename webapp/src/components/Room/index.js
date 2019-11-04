import React, { Component } from 'react';
import { subscribe } from '../../services/socket';
import { connect } from 'react-redux';
import './Room.scss';


class Room extends Component {
  state = {
    message: '',
    messages: [],
  }

  componentDidMount() {
    this.getMessages()
    subscribe('MESSAGE', message => {
      this.setState({
        messages: this.state.messages.concat(message)
      })
    });
  }

  onMessageChange = (e) => {
    this.setState({ message: e.target.value });
  }

  addMessage = () => {
    console.log(this.props, this.state)
    const body = JSON.stringify({ message: this.state.message })
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.props.token}`
    }
    fetch(`http://localhost:4332/rooms/${this.props.match.params.roomName}/messages`, {
      method : 'POST',
      headers,
      body
    })
    
    .then(res => res.json())
    .then(data => {
      if (data === 'success') {
        this.setState({ message : '' });
        window.location = '/';
      }
    })
    .catch(err => console.warn(err))
  }

  getMessages = () => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.props.token}`
    }
    fetch(`http://localhost:4332/rooms/${this.props.match.params.roomName}/messages`, {
      method : 'GET',
      headers,
    })
    .then(res => res.json())
    .then(messages => {
      this.setState({
        messages,
      })
    })
    .catch(err => console.warn(err))
  }

  render() {
    console.log(this.props.match.params.roomName);
    return(
      <div className="room_content">
        <p>T'es dans la room {this.props.match.params.roomName}</p>
        <ul>
          { 
            this.state.messages.map(message => {
              return <li key={message._id}>{message.text}</li>
            })
          }
        </ul>
        <div className="room_content_form">
          <form>
            <label>
              Ecrivez votre message
              <input type="text" name="message" value={this.state.message} onChange={this.onMessageChange}></input>
            </label>
          </form>
          <div className="send_message_button">
              <button className="button_send" value="Envoyer" onClick={() => this.addMessage(this.state.message)}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(Room);