import React from 'react';
import './Messages.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';

const Messages = (props) => (
  <ScrollToBottom className="messages">
    {props.messages && props.messages.map((message) => <div key={message._id}><Message message={message} name={props.name} /></div>)}
  </ScrollToBottom>
);

export default Messages;
