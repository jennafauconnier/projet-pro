import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoomCreation from '../RoomCreation';
// import { Link } from 'react-router-dom';
import './Home.scss';

class Home extends Component {
  state = {
    rooms : [],
    users : [],
  }

  async componentDidMount() {
    const res = await fetch('http://localhost:4332/rooms', {
      method : 'GET',
      headers : { 
         'Accept' : 'application/json',
         'Content-Type': 'application/json',
         'Authorization' : `Bearer ${this.props.token}`
      }
    });
    const { rooms } = await res.json()
    this.setState({ rooms });
  }

  joinRoom = (roomName) => {
    fetch(`http://localhost:4332/rooms/${roomName}/join`, {
      method : 'POST',
      headers : { 
         'Accept' : 'application/json',
         'Content-Type': 'application/json',
         'Authorization' : `Bearer ${this.props.token}`
      }
    }).then( () => {
      this.props.history.push(`/room/${roomName}`)
    })
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

  getListRoom = () => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.props.token}`
    }
    fetch(`http://localhost:4332/rooms`, {
      method : 'GET',
      headers,
    })
    .then(list => {
      console.log(list);
      this.setState({
        list,
      })
    })
    .catch(err => console.warn(err))
  }

  getUsersRoom = () => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.props.token}`
    }
    fetch(`http://localhost:4332/rooms`, {
      method : 'GET',
      headers,
    })
    .then(users => {
      console.log(users);
      this.setState({
        users,
      })
    })
    .catch(err => console.warn(err))
  }

  render(){
    return(
    <>
      {/* <h1>General</h1> */}
      <div className="list_rooms">
      <RoomCreation onRoomCreation={this.createRoom}/>

        <ul>
          { 
            this.state.rooms.map(room => {
              return <li key={room._id}>
                <button type="button" onClick={() => this.joinRoom(room.name)}>
                  {room.name}
                {/* // <Link to={`/room/${room.name}`}>{room.name}</Link> */}
                </button>
              </li>
            })
          }
        </ul>
      </div>
    </>
    )
  }
}

const mapStateToProps = state => ({ token : state.token})

export default connect(mapStateToProps)(Home);