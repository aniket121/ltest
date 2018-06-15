import {
  OPEN_MODAL,
  CLOSE_MODAL,
  CHANGE_MODAL_TYPE,
  SELECT_GROUP,
  SET_SHARE_LINK
} from 'actions/app/types';
import {
  CREATE_STREAM_TARGET_SUCCESS
} from 'actions/stream-targets/types';
import {
  LOGOUT_USER
} from 'actions/auth/types';

export const defaultState = {
  open: false,
  modalType: '',
  selectedGroup: null
};

export default (state = defaultState, action) => {
  const {type, payload} = action;
  // console.log("action-" + JSON.stringify(action));
  switch (type) {
    case OPEN_MODAL:
      return {
        ...state,
        open: true
      };
    case CREATE_STREAM_TARGET_SUCCESS:
    case CLOSE_MODAL:
      return {
        ...state,
        open: false,
        modalType: '',
        selectedGroup: null
      };
    case SELECT_GROUP:
    case CHANGE_MODAL_TYPE:
      return {
        ...state,
        ...payload
      };
    case SET_SHARE_LINK:
      // console.log("SetSHAreLink=" + JSON.stringify({...state, ...payload}));
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
