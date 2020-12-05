import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserById } from '../../actions/user';

import './Join.css';

const JoinForm = (props) => {
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join Your Room</h1>
        <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
        <Link onClick={(event) => ((!room) ? event.preventDefault() : null)} to={`/chat?name=${props.auth.user.name}&room=${room}`}>
          <button className="button mt-20" type="submit">JOIN</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const Join = connect(mapStateToProps, { getUserById })(JoinForm);
export default Join;
