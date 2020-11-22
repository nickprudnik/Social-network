import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';
import { CREATE_LOGIN_ERROR } from './types';
import { CREATE_REGISTER_ERROR } from './types';
import setAuthToken from '../utils/setAuthToken';

export const signUp = (userData, history) => (dispatch) => {
  axios
    .post('/api/auth/register', userData)
    .then(() => dispatch(login(userData, history)))
    .then(() => history.push('/'))
    .catch(error  => { 
      dispatch({
        type: CREATE_REGISTER_ERROR,
        payload: error.response
      })
    })
};

export const login = (userData, history) => (dispatch) => {
  axios
    .post('/api/auth/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('access_token', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .then(() => history.push('/'))
    .catch(error  => { 
      dispatch({
        type: CREATE_LOGIN_ERROR,
        payload: error.response
      })
    })
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('access_token');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
});
