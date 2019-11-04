import moment from 'moment';
import React, { Component } from 'react';
import { subscribe } from '../../services/socket';
import { connect } from 'react-redux';
import './Room.scss';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

class Room extends Component {
  state = {
    message: '',
    messages: [],
  };

  componentDidMount() {
    this.getMessages();
    subscribe('MESSAGE', message => {
      console.warn('message', message);
      if (message.room !== this.props.match.params.roomName) return;
      console.log({ message });
      this.setState({
        messages: this.state.messages.concat(message),
      });
    });
  }

  onMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  addMessage = () => {
    const body = JSON.stringify({ message: this.state.message });
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.props.token}`,
    };
    fetch(
      `http://localhost:4332/rooms/${this.props.match.params.roomName}/messages`,
      {
        method: 'POST',
        headers,
        body,
      },
    )
      .then(res => res.json())
      .then(() => {
        this.setState({ message: '' });
      })
      .catch(err => console.warn(err));
  };

  getMessages = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.props.token}`,
    };
    fetch(
      `http://localhost:4332/rooms/${this.props.match.params.roomName}/messages`,
      {
        method: 'GET',
        headers,
      },
    )
      .then(res => res.json())
      .then(messages => {
        console.warn({ messages });
        this.setState({
          messages,
        });
      })
      .catch(err => console.warn(err));
  };

  formatDate(date) {
    return moment(date).fromNow();
  }

  render() {
    return (
      <div className="room_content">
        <div className="room_content_creation">
          <p>Room {this.props.match.params.roomName}</p>
        </div>
        <div className="messages">
          <ul>
            {this.state.messages.map(message => {
              return (
                <li key={message.id}>
                  <div className="username">
                    <span>{message.username}</span>
                    <span className="username-date">
                      {this.formatDate(message.date)}
                    </span>
                    <p>{message.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <form
          className="room_content_form"
          onSubmit={e => {
            e.preventDefault();
            this.addMessage(this.state.message);
          }}
        >
          <label>
            <input
              className="send_message_input"
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.onMessageChange}
            ></input>
          </label>
          <div className="send_message_button">
            <button className="button_send" value="Envoyer" type="submit">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(Room);
