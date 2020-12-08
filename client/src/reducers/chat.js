import {
    ADD_CHAT,
    GET_CHAT,
    UPDATE_ROOM,
    AFTER_POST_MESSAGE
  } from '../actions/types';
  
  const initialState = {
    chats: null,
    chat: null,
    chatId: 0,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_CHAT:
        return {
          ...state,
          chats: action.payload,
        };
      case ADD_CHAT:
        return {
          ...state,
          chats: [action.payload],
        };
      case UPDATE_ROOM: 
        return {
          ...state,
          message: action.payload,
        }
      case AFTER_POST_MESSAGE: 
        return {
          ...state,
          chats: state.chats[0].messages.concat(action.payload)
          // chats: [...state.chats[0].messages, action.payload]
        }
      default:
        return state;
    }
  };
  