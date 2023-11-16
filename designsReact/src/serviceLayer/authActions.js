import { SET_AUTH_TOKEN, CLEAR_AUTH_TOKEN, SET_USER_DETAILS } from './authActionTypes';

export const setAuthToken = (token) => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

export const clearAuthToken = () => ({
  type: CLEAR_AUTH_TOKEN,
});

export const setUserDetails = (userDetails) => ({
  type: SET_USER_DETAILS,
  payload: userDetails,
});

