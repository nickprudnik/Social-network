import { SET_CURRENT_USER } from '../actions/types';
import { CREATE_LOGIN_ERROR } from '../actions/types';
import { CREATE_REGISTER_ERROR } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}, 
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length !== 0,
        user: action.payload,
        error: null,
      }
    case CREATE_LOGIN_ERROR: 
    return {
        ...state,
        error: action.payload.data,
      }
    case CREATE_REGISTER_ERROR:
      return {
        ...state,
        error: action.payload.data
      }
    default:
      return state
  }
};
