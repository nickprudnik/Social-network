import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

export const register = (userData, history) => () => {
  axios
    .post('/api/auth/register', userData)
    .then(login(userData))
    .then(() => history.push('/'))
};

export const login = (userData) => (dispatch) => {
  delete userData.name;
  axios
    .post('/api/auth/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('access_token', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    });
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
