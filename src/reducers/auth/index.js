import {
  SAVE_USER_TOKEN,
  FETCH_USER_TOKEN,
  ERROR_USER_TOKEN,
  REMOVE_USER_TOKEN,
  LOGOUT_USER
} from 'actions/auth/types';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from 'actions/users/types';

export const defaultState = {
  user: null,
  userToken: null,
  userTokenProvider: null,
  userTokenExpiry: null,
  isLoading: false,
  error: ''
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case REMOVE_USER_TOKEN:
      return {
        ...state,
        user: null,
        userToken: null,
        userTokenProvider: null,
        userTokenExpiry: null
      };
    case FETCH_USER_REQUEST:
    case FETCH_USER_SUCCESS:
    case FETCH_USER_FAIL:
    case CREATE_USER_REQUEST:
    case CREATE_USER_SUCCESS:
    case CREATE_USER_FAIL:
    case UPDATE_USER_REQUEST:
    case UPDATE_USER_SUCCESS:
    case UPDATE_USER_FAIL:
    case FETCH_USER_TOKEN:
    case SAVE_USER_TOKEN:
    case ERROR_USER_TOKEN:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT_USER:
      return defaultState;
    default:
      return state;
  }
};
