import { dedupeByKey } from 'libs/arrays';
import {
  ENABLE_GO_LIVE,
  TOGGLE_LOCAL_AUDIO,
  TOGGLE_LOCAL_VIDEO,
  TOGGLE_CHAT,
  START_COUNTDOWN,
  TICK_COUNTDOWN,
  END_BROADCAST,
  RESET_LIVE_STATE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
  SET_VIEWERS,
  SET_POLL_INTERVAL_ID,
  CLEAR_POLL_INTERVAL_ID,
  TRANSITION_BROADCAST_REQUEST,
  TRANSITION_BROADCAST_SUCCESS,
  TRANSITION_BROADCAST_FAIL,
  JOIN_CHANNEL,
  LEAVE_CHANNEL
} from 'actions/live/types';
import {
  LOGOUT_USER
} from 'actions/auth/types';

export const defaultState = {
  shouldEnableGoLive: false,
  isLoading: false,
  showCountdown: false,
  countdown: 3,
  isLive: false,
  connected: false,
  connectionAttempted: false,
  publishers: null,
  subscribers: null,
  meta: null,
  localAudioEnabled: true,
  localVideoEnabled: true,
  status: null,
  error: '',
  isChatDocked: true,
  messages: [],
  chatNotification: false,
  viewers: null
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch(type) {
    case TICK_COUNTDOWN:
      const countdown = state.countdown - 1;
      const isLive = countdown === 0;
      const showCountdown = countdown > 0;
      return {
        ...state,
        showCountdown,
        countdown,
        isLive
      };
    case TOGGLE_LOCAL_AUDIO:
      return {
        ...state,
        localAudioEnabled: !state.localAudioEnabled
      };
    case TOGGLE_LOCAL_VIDEO:
      return {
        ...state,
        localVideoEnabled: !state.localVideoEnabled
      };
    case TOGGLE_CHAT:
      return {
        ...state,
        isChatDocked: !state.isChatDocked,
        chatNotification: false
      };
    case END_BROADCAST:
      return {
        ...defaultState,
        connectionAttempted: true,
        isChatDocked: true
      };
    case RESET_LIVE_STATE:
      return defaultState;
    case FETCH_COMMENTS_SUCCESS:
      const messagesAggregate = state.messages.concat(payload.messages);
      const newMessages = dedupeByKey(messagesAggregate, 'id')
      const receivedNewMessages = newMessages.length !== state.messages.length;
      return {
        ...state,
        messages: newMessages,
        chatNotification: state.isChatDocked && receivedNewMessages
      };
    case SET_VIEWERS:
      const { viewerSource: { source, count } } = payload
      return {
        ...state,
        viewers: {
          ...state.viewers,
          [source]: count
        }
      };
    case START_COUNTDOWN:
    case FETCH_COMMENTS_REQUEST:
    case FETCH_COMMENTS_FAIL:
    case TRANSITION_BROADCAST_REQUEST:
    case TRANSITION_BROADCAST_SUCCESS:
    case TRANSITION_BROADCAST_FAIL:
    case JOIN_CHANNEL:
    case LEAVE_CHANNEL:
    case ENABLE_GO_LIVE:
    case SET_POLL_INTERVAL_ID:
    case CLEAR_POLL_INTERVAL_ID:
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
