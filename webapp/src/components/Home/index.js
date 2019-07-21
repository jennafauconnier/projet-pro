import React, { Component } from 'react';
import { connectSocket } from '../../services/socket';
import { connect } from 'react-redux';
import RoomCreation from '../RoomCreation';

class Home extends Component {
  componentDidMount() {
    fetch('http://localhost:4332/rooms', {
      method : 'GET',
      headers : { 
         'Accept' : 'application/json',
         'Content-Type': 'application/json',
         'Authorization' : `Bearer ${this.props.token}`
      }
    });
    const token = this.props.token;
    connectSocket(token);
  }

  createRoom = (roomName) => {
    fetch('http://localhost:4332/rooms', {
      method : 'POST',
      headers : { 
         'Accept' : 'application/json',
         'Content-Type': 'application/json',
         'Authorization' : `Bearer ${this.props.token}`
      },
      body: JSON.stringify({
        name: roomName
      })
    }).then( () => {
      this.props.history.push(`/room/${roomName}`)
    })
  }

  render(){
    return(
    <>
      <h1>General</h1>
      <RoomCreation onRoomCreation={this.createRoom}/>
    </>
    )
  }
}

const mapStateToProps = state => ({ token : state.token})

export default connect(mapStateToProps)(Home);