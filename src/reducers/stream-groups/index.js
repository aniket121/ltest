import {
  FETCH_STREAM_GROUPS_REQUEST,
  FETCH_STREAM_GROUPS_SUCCESS,
  FETCH_STREAM_GROUPS_FAIL,
  FETCH_STREAM_GROUP_REQUEST,
  FETCH_STREAM_GROUP_SUCCESS,
  FETCH_STREAM_GROUP_FAIL,
  CREATE_STREAM_GROUP_REQUEST,
  CREATE_STREAM_GROUP_SUCCESS,
  CREATE_STREAM_GROUP_FAIL,
  DELETE_STREAM_GROUP_REQUEST,
  DELETE_STREAM_GROUP_SUCCESS,
  DELETE_STREAM_GROUP_FAIL
} from 'actions/stream-groups/types';
import {
  LOGOUT_USER
} from 'actions/auth/types';

export const defaultState = {
  streamGroups: [],
  currentGroup: null,
  isLoading: false,
  isDeleting: false,
  isSaving: false,
  error: ''
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch(type) {
    case CREATE_STREAM_GROUP_SUCCESS:
      return {
        ...state,
        streamGroups: state.streamGroups.concat(payload.streamGroup),
        isSaving: false,
      };
    case DELETE_STREAM_GROUP_SUCCESS:
      const indexToDelete = state.streamGroups.findIndex(
        group => group.streamGroupId === payload.streamGroupId
      );

      return {
        ...state,
        streamGroups: [
          ...state.streamGroups.slice(0, indexToDelete),
          ...state.streamGroups.slice(indexToDelete + 1)
        ],
        isDeleting: false
      };
    case FETCH_STREAM_GROUP_SUCCESS:
    case FETCH_STREAM_GROUP_REQUEST:
    case FETCH_STREAM_GROUP_FAIL:
    case FETCH_STREAM_GROUPS_REQUEST:
    case FETCH_STREAM_GROUPS_SUCCESS:
    case FETCH_STREAM_GROUPS_FAIL:
    case CREATE_STREAM_GROUP_REQUEST:
    case CREATE_STREAM_GROUP_FAIL:
    case DELETE_STREAM_GROUP_REQUEST:
    case DELETE_STREAM_GROUP_FAIL:
      return {
        ...state,
        ...payload
      };
    case LOGOUT_USER:
      return defaultState;
    default:
      return state;
  }
}
