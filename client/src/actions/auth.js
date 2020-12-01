import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER, CREATE_LOGIN_ERROR, CREATE_REGISTER_ERROR } from './types';

import setAuthToken from '../utils/setAuthToken';

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const login = (userData, history) => (dispatch) => {
  axios
    .post('/api/auth/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('accessToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .then(() => history.push('/'))
    .catch((error) => {
      dispatch({
        type: CREATE_LOGIN_ERROR,
        payload: error.response,
      });
    });
};

export const signUp = (userData, history) => (dispatch) => {
  axios
    .post('/api/auth/register', userData)
    .then(() => dispatch(login(userData, history)))
    .then(() => history.push('/'))
    .catch((error) => {
      dispatch({
        type: CREATE_REGISTER_ERROR,
        payload: error.response,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('accessToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
