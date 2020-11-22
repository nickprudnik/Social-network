import React, { useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getUserById } from '../../actions/user';

import './Join.css';

const JoinForm = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
       <div className="joinOuterContainer">
           <div className="joinInnerContainer">
                <h1 className="heading">Join Your Room</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">JOIN</button>
        </Link>
           </div>

       </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
  })

const Join = connect(mapStateToProps, { getUserById })(JoinForm);
export default Join;