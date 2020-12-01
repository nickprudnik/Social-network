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

const setUserLoading = (isLoading) => ({
  type: USER_LOADING,
  payload: isLoading,
});
