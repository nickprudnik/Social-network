import axios from 'axios';

import { GET_USER, USER_LOADING, UPDATE_USER } from './types';

export const getUserById = (id) => (dispatch) => {
  dispatch(setUserLoading(true));
  axios
    .get(`/api/users/${id}`)
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    })
    .catch(() => dispatch(setUserLoading(false)));
};

export const editProfile = (userData) => (dispatch) => {
  axios
    .put('/api/users', userData)
    .then((res) => dispatch({
      type: UPDATE_USER,
      payload: res.data,
    }));
};

export const uploadImage = (userImage) => (dispatch) => {
  const fd = new FormData();
  fd.append('image', userImage);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  axios
    .put('/api/userImages', fd, config);
}

export const getImage = (id) => (dispatch) => {
  axios
    .get(`/api/userImages`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err));
}

const setUserLoading = (isLoading) => ({
  type: USER_LOADING,
  payload: isLoading,
});
