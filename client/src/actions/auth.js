import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

export const signUp = (userData, history) => () => {
  axios
    .post('/api/auth/register', userData)
    .then(() => history.push('/login'))
}

export const login = (userData, history) => (dispatch) => {
  delete userData.name;
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
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('access_token');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
});
