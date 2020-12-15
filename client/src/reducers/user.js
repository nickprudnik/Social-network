import { USER_LOADING, GET_USER, UPDATE_USER, UPLOAD_IMAGE } from '../actions/types';

const initialState = {
  user: null,
  users: null,
  isLoading: false,
  isImageUploaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UPLOAD_IMAGE: 
      return {
        ...state,
        isImageUploaded: true,
      }
    default:
      return state;
  }
};
