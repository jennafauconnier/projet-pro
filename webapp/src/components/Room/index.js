import React, { Component } from 'react';

class Room extends Component {

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