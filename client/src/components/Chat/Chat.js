import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { connect, useDispatch } from 'react-redux';
import { getChatByName, afterPostMessage, createChat } from '../../actions/chat';

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const ChatForm = (props) => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const [chatId, setChatId] = useState();
  const ENDPOINT = 'http://localhost:3000/';

  const dispatch = useDispatch();

  useEffect(() => {
    const { room, name } = queryString.parse(location.search);
    setRoom(room);
    setName(name);

    dispatch(getChatByName(room));

    socket = io(ENDPOINT);

    socket.on("Output Chat Message", messageFromBackEnd => {
      dispatch(getChatByName(room));
  })
  }, [location.search])

  useEffect(() => {
    let chatsArray = props.chats.chats;
    if (chatsArray !== null && chatsArray.length == 0) {
      dispatch(createChat({name: room}));
      console.log("Set the new room and save in Mongodb"); 
    } else if(chatsArray !== null) {
      console.log("Set the current room");

      let chatArray = props.chats.chats;
      let chatName;
      chatArray.forEach(chat => {
        chatName = chat.name
        setChatId(chat._id)
      });
    }
  }, [props.chats.chats]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message && chatId) {
      let chatMessage = message
      let userId = props.auth.user.id
      let chatShemaId = chatId
  
      socket.emit("Input Chat Message", {
        chatMessage,
        userId,
        chatShemaId
      });
  
      setMessage('')
    }
  };

  return (
    <div className="outerContainer">
      <div className="container-chat">
        <InfoBar room={room} />
        {(props.chats.chats !== null) && (props.chats.chats !== []) && props.chats.chats.map((chat) => (
          <Messages key={chat._id} {...chat} name={name} />
        ))}
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chats: state.chat
});

const Chat = connect(mapStateToProps, { getChatByName, afterPostMessage, createChat })(ChatForm);

export default Chat;
