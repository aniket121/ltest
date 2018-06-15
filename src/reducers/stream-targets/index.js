import {
  FETCH_STREAM_TARGETS_REQUEST,
  FETCH_STREAM_TARGETS_SUCCESS,
  FETCH_STREAM_TARGETS_FAIL,
  CREATE_STREAM_TARGET_REQUEST,
  CREATE_STREAM_TARGET_SUCCESS,
  CREATE_STREAM_TARGET_FAIL,
  DELETE_STREAM_TARGET_REQUEST,
  DELETE_STREAM_TARGET_SUCCESS,
  DELETE_STREAM_TARGET_FAIL,
  STORE_TOKEN_FOR_TARGET
} from 'actions/stream-targets/types';
import { LOGOUT_USER } from 'actions/auth/types';

export const defaultState = {
  streamTargets: [],
  isLoading: false,
  isSaving: false,
  isDeleting: false,
  token: null,
  error: {}
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_STREAM_TARGET_SUCCESS:
      return {
        ...state,
        streamTargets: state.streamTargets.concat(payload.streamTarget),
        isSaving: false,
        error: {}
      };
    case DELETE_STREAM_TARGET_SUCCESS:
      const indexToDelete = state.streamTargets.findIndex(
        target => target.streamTargetId === payload.streamTargetId
      );
      return {
        ...state,
        streamTargets: [
          ...state.streamTargets.slice(0, indexToDelete),
          ...state.streamTargets.slice(indexToDelete + 1)
        ],
        isDeleting: false,
        error: {}
      };
    case FETCH_STREAM_TARGETS_REQUEST:
    case FETCH_STREAM_TARGETS_SUCCESS:
    case CREATE_STREAM_TARGET_REQUEST:
    case DELETE_STREAM_TARGET_REQUEST:
    case STORE_TOKEN_FOR_TARGET:
      return {
        ...state,
        ...payload,
        error: {}
      };
    case FETCH_STREAM_TARGETS_FAIL:
    case CREATE_STREAM_TARGET_FAIL:
    case DELETE_STREAM_TARGET_FAIL:
      return {
        ...state,
        ...payload
      };
    case LOGOUT_USER:
      return defaultState;
    default:
      return state;
  }
};
