import axios from 'axios';

import {
  ADD_CHAT,
  GET_CHAT,
  UPDATE_ROOM,
  AFTER_POST_MESSAGE
} from './types';

export const createChat = (room) => (dispatch) => {
  axios
    .post('/api/chats', room)
    .then((res) => dispatch({
      type: ADD_CHAT,
      payload: res.data,
    }));
};

export const getChatByName = (name) => (dispatch) => {
    axios
      .get(`/api/chats/${name}`)
      .then((res) => dispatch({
        type: GET_CHAT,
        payload: res.data,
      }))
      .catch((err) => console.log(err));
  };

export function afterPostMessage(data){
    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}


  // export const sendUserMessage = (chatId, text) => (dispatch) => {
  //   axios
  //     .post(`/api/chats/${chatId}/messages`, text)
  //     .then((res) => dispatch({
  //       type: UPDATE_ROOM,
  //       payload: res.data,
  //     }));
  // };
