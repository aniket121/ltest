export const FETCH_BROADCASTS_REQUEST = 'FETCH_BROADCASTS_REQUEST';
export const FETCH_BROADCASTS_SUCCESS = 'FETCH_BROADCASTS_SUCCESS';
export const FETCH_BROADCASTS_FAIL = 'FETCH_BROADCASTS_FAIL';

export const FETCH_BROADCAST_REQUEST = 'FETCH_BROADCAST_REQUEST';
export const FETCH_BROADCAST_SUCCESS = 'FETCH_BROADCAST_SUCCESS';
export const FETCH_BROADCAST_FAIL = 'FETCH_BROADCAST_FAIL';

export const CREATE_BROADCAST_REQUEST = 'CREATE_BROADCAST_REQUEST';
export const CREATE_BROADCAST_SUCCESS = 'CREATE_BROADCAST_SUCCESS';
export const CREATE_BROADCAST_FAIL = 'CREATE_BROADCAST_FAIL';

export const DELETE_BROADCAST_REQUEST = 'DELETE_BROADCAST_REQUEST';
export const DELETE_BROADCAST_SUCCESS = 'DELETE_BROADCAST_SUCCESS';
export const DELETE_BROADCAST_FAIL = 'DELETE_BROADCAST_FAIL';

/**************************************************
* Action Creators
**************************************************/

export const fetchBroadcastsRequest = () => ({
  type: FETCH_BROADCASTS_REQUEST,
  payload: {
    isLoading: true
  }
});

export const fetchBroadcastsSuccess = (broadcasts = []) => ({
  type: FETCH_BROADCASTS_SUCCESS,
  payload: {
    broadcasts,
    isLoading: false
  }
});

export const fetchBroadcastsFail = (error = '') => ({
  type: FETCH_BROADCASTS_FAIL,
  payload: {
    error,
    isLoading: false
  }
});

export const fetchBroadcastRequest = () => ({
  type: FETCH_BROADCAST_REQUEST,
  payload: {
    isLoading: true
  }
});

export const fetchBroadcastSuccess = currentBroadcast => ({
  type: FETCH_BROADCAST_SUCCESS,
  payload: {
    currentBroadcast,
    isLoading: false
  }
});

export const fetchBroadcastFail = (error = '') => ({
  type: FETCH_BROADCAST_FAIL,
  payload: {
    error,
    isLoading: false
  }
});

export const createBroadcastRequest = () => ({
  type: CREATE_BROADCAST_REQUEST,
  payload: {
    isSaving: true
  }
});

export const createBroadcastSuccess = broadcast => ({
  type: CREATE_BROADCAST_SUCCESS,
  payload: {
    broadcast,
    isSaving: false
  }
});

export const createBroadcastFail = (error = '') => ({
  type: CREATE_BROADCAST_FAIL,
  payload: {
    error,
    isSaving: false
  }
});

export const deleteBroadcastRequest = (broadcastId = '') => ({
  type: DELETE_BROADCAST_REQUEST,
  payload: { isDeleting: true }
})

export const deleteBroadcastSuccess = (broadcastId = '') => ({
  type: DELETE_BROADCAST_SUCCESS,
  payload: { broadcastId, isDeleting: false }
})

export const deleteBroadcastFail = (error = '') => ({
  type: DELETE_BROADCAST_FAIL,
  payload: { error, isDeleting: false }
})
