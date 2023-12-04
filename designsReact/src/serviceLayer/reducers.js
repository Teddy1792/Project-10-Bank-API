import { SET_AUTH_TOKEN, CLEAR_AUTH_TOKEN, SET_USER_DETAILS } from './authActionTypes';

const initialState = {
  authToken: null,
  user: null, // Initialize user as null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case CLEAR_AUTH_TOKEN:
      return {
        ...state,
        authToken: null,
      };
    case SET_USER_DETAILS:
      // Set user details using action.payload
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
