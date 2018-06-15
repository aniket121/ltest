export const FETCH_STREAM_GROUPS_REQUEST = 'FETCH_STREAM_GROUPS_REQUEST';
export const FETCH_STREAM_GROUPS_SUCCESS = 'FETCH_STREAM_GROUPS_SUCCESS';
export const FETCH_STREAM_GROUPS_FAIL = 'FETCH_STREAM_GROUPS_FAIL';

export const FETCH_STREAM_GROUP_REQUEST = 'FETCH_STREAM_GROUP_REQUEST';
export const FETCH_STREAM_GROUP_SUCCESS = 'FETCH_STREAM_GROUP_SUCCESS';
export const FETCH_STREAM_GROUP_FAIL = 'FETCH_STREAM_GROUP_FAIL';

export const CREATE_STREAM_GROUP_REQUEST = 'CREATE_STREAM_GROUP_REQUEST';
export const CREATE_STREAM_GROUP_SUCCESS = 'CREATE_STREAM_GROUP_SUCCESS';
export const CREATE_STREAM_GROUP_FAIL = 'CREATE_STREAM_GROUP_FAIL';

export const DELETE_STREAM_GROUP_REQUEST = 'DELETE_STREAM_GROUP_REQUEST';
export const DELETE_STREAM_GROUP_SUCCESS = 'DELETE_STREAM_GROUP_SUCCESS';
export const DELETE_STREAM_GROUP_FAIL = 'DELETE_STREAM_GROUP_FAIL';


export const FETCH_ENABLE_RTMP = 'FETCH_ENABLE_RTMP';
export const FETCH_ENABLE_SUCCESS = 'FETCH_ENABLE_SUCCESS';
export const FETCH_ENABLE_FAIL = 'FETCH_ENABLE_FAIL';

/**************************************************
* Action Creators
**************************************************/

export const fetchStreamGroupsRequest = () => ({
  type: FETCH_STREAM_GROUPS_REQUEST,
  payload: {
    isLoading: true
  }
});
export const fetchRtmpRequest = () => ({
  type: FETCH_ENABLE_RTMP,
  payload: {
    isLoading: true
  }
});
export const fetchRtmpSuccess = (streamGroups = []) => ({
  type: FETCH_ENABLE_SUCCESS,
  payload: {
    streamGroups,
    isLoading: false
  }
});
export const fetchRtmpFail = (error = '') => ({
  type: FETCH_ENABLE_FAIL,
  payload: {
     error,
    isLoading: false
  }
});

export const fetchStreamGroupsSuccess = (streamGroups = []) => ({
  type: FETCH_STREAM_GROUPS_SUCCESS,
  payload: {
    streamGroups,
    isLoading: false
  }
});

export const fetchStreamGroupsFail = (error = '') => ({
  type: FETCH_STREAM_GROUPS_FAIL,
  payload: {
    error,
    isLoading: false
  }
});

export const fetchStreamGroupRequest = () => ({
  type: FETCH_STREAM_GROUP_REQUEST,
  payload: {
    isLoading: true
  }
});

export const fetchStreamGroupSuccess = currentGroup => ({
  type: FETCH_STREAM_GROUP_SUCCESS,
  payload: {
    currentGroup,
    isLoading: false
  }
});

export const fetchStreamGroupFail = (error = '') => ({
  type: FETCH_STREAM_GROUP_FAIL,
  payload: {
    error,
    isLoading: false
  }
});

export const createStreamGroupRequest = () => ({
  type: CREATE_STREAM_GROUP_REQUEST,
  payload: {
    isSaving: true
  }
});

export const createStreamGroupSuccess = streamGroup => ({
  type: CREATE_STREAM_GROUP_SUCCESS,
  payload: {
    streamGroup,
    isSaving: false
  }
});

export const createStreamGroupFail = (error = '') => ({
  type: CREATE_STREAM_GROUP_FAIL,
  payload: {
    error,
    isSaving: false
  }
});

export const deleteStreamGroupRequest = (streamGroupId = '') => ({
  type: DELETE_STREAM_GROUP_REQUEST,
  payload: { isDeleting: true }
})

export const deleteStreamGroupSuccess = (streamGroupId = '') => ({
  type: DELETE_STREAM_GROUP_SUCCESS,
  payload: { streamGroupId, isDeleting: false }
})

export const deleteStreamGroupFail = (error = '') => ({
  type: DELETE_STREAM_GROUP_FAIL,
  payload: { error, isDeleting: false }
})
