import React, { Component } from 'react';
import './RoomCreation.scss';


class RoomCreation extends Component {
  state = {
    roomName : ''
  }

  setRoomName = (e) => {
    this.setState({ roomName: e.target.value });
  }

  onClick = () => {
    this.props.onRoomCreation(this.state.roomName);
  }
  
  render() {
    return(
      <div className="room_name">
        <div className="room_name-content">
          <p>Create a room</p>
        </div>
        <form className="room-name_form">
          <input
            type="text"
            required
            placeholder="Enter a room name"
            onChange={this.setRoomName}
          ></input>
        </form>
        <div className="room-name_button">
          <button
            className="room-name_button_submit"
            onClick={this.onClick}>
              Submit
          </button>
        </div>
      </div>
    )
  }
}

export default RoomCreation;