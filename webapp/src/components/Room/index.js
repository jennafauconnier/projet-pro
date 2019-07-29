import React, { Component } from 'react';
import { connectSocket } from '../../services/socket';

class Room extends Component {

  createMessage = (roomName) => {
    fetch('http://localhost:4332/rooms/messages', {
      method : 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${this.props.token}`
      },
      body: JSON.stringify({
        name : roomName
      })
    }).then( () => {
      this.props.history.push(`/room/${roomName}/messages`)
    })
    const token = this.props.token;
    connectSocket(token);
  }

  render() {
    console.log(this.props.match.params.roomName);
    return(
      <div className="room_content">      
        <p>T'es dans la room {this.props.match.params.roomName}</p>
      </div>
    )
  }
}

export default Room;