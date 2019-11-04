import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoomCreation from '../RoomCreation';
import { Link } from 'react-router-dom';
import './Home.scss';

class Home extends Component {
  state = {
    rooms : [],
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
                <Link to={`/room/${room.name}`}>{room.name}</Link>
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