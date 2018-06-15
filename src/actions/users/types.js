export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
  payload: {
    isLoading: true
  }
});

export const fetchUserSuccess = (user = {}) => ({
  type: FETCH_USER_SUCCESS,
  payload: {
    isLoading: false,
    user
  }
});

export const fetchUserFail = (error = '') => ({
  type: FETCH_USER_FAIL,
  payload: {
    isLoading: false,
    error
  }
});

export const createUserRequest = () => ({
  type: CREATE_USER_REQUEST,
  payload: {
    isCreating: true
  }
});

export const createUserSuccess = (user = {}) => ({
  type: CREATE_USER_SUCCESS,
  payload: {
    isCreating: false,
    user
  }
});

export const createUserFail = (error = '') => ({
  type: CREATE_USER_FAIL,
  payload: {
    isCreating: false,
    error
  }
});

export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
  payload: {
    isUpdating: true
  }
});

export const updateUserSuccess = (user = {}) => ({
  type: UPDATE_USER_SUCCESS,
  payload: {
    isUpdating: false,
    user
  }
});

export const updateUserFail = (error = '') => ({
  type: UPDATE_USER_FAIL,
  payload: {
    isUpdating: false,
    error
  }
});
