export const FETCH_STREAM_TARGETS_REQUEST = 'FETCH_STREAM_TARGETS_REQUEST';
export const FETCH_STREAM_TARGETS_SUCCESS = 'FETCH_STREAM_TARGETS_SUCCESS';
export const FETCH_STREAM_TARGETS_FAIL = 'FETCH_STREAM_TARGETS_FAIL';

export const CREATE_STREAM_TARGET_REQUEST = 'CREATE_STREAM_TARGET_REQUEST';
export const CREATE_STREAM_TARGET_SUCCESS = 'CREATE_STREAM_TARGET_SUCCESS';
export const CREATE_STREAM_TARGET_FAIL = 'CREATE_STREAM_TARGET_FAIL';

export const DELETE_STREAM_TARGET_REQUEST = 'DELETE_STREAM_TARGET_REQUEST';
export const DELETE_STREAM_TARGET_SUCCESS = 'DELETE_STREAM_TARGET_SUCCESS';
export const DELETE_STREAM_TARGET_FAIL = 'DELETE_STREAM_TARGET_FAIL';

export const STORE_TOKEN_FOR_TARGET = 'STORE_TOKEN_FOR_TARGET';

/**************************************************
* Action Creators
**************************************************/

export const fetchStreamTargetsRequest = () => ({
  type: FETCH_STREAM_TARGETS_REQUEST,
  payload: {
    isLoading: true
  }
});

export const fetchStreamTargetsSuccess = (streamTargets = []) => ({
  type: FETCH_STREAM_TARGETS_SUCCESS,
  payload: {
    streamTargets,
    isLoading: false
  }
});

export const fetchStreamTargetsFail = (error = {}) => ({
  type: FETCH_STREAM_TARGETS_FAIL,
  payload: {
    error,
    isLoading: false
  }
});

export const createStreamTargetRequest = () => ({
  type: CREATE_STREAM_TARGET_REQUEST,
  payload: {
    isSaving: true
  }
});

export const createStreamTargetSuccess = streamTarget => ({
  type: CREATE_STREAM_TARGET_SUCCESS,
  payload: {
    streamTarget,
    isSaving: false
  }
});

export const createStreamTargetFail = (error = {}) => ({
  type: CREATE_STREAM_TARGET_FAIL,
  payload: {
    error,
    isSaving: false
  }
});

export const deleteStreamTargetRequest = (streamTargetId = '') => ({
  type: DELETE_STREAM_TARGET_REQUEST,
  payload: {
    isDeleting: true
  }
});

export const deleteStreamTargetSuccess = (streamTargetId = '') => ({
  type: DELETE_STREAM_TARGET_SUCCESS,
  payload: {
    streamTargetId,
    isDeleting: false
  }
});

export const deleteStreamTargetFail = (error = {}) => ({
  type: DELETE_STREAM_TARGET_FAIL,
  payload: {
    error,
    isDeleting: false
  }
});

export const storeTokenForTarget = token => ({
  type: STORE_TOKEN_FOR_TARGET,
  payload: { token }
});
