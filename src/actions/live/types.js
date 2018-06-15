export const ENABLE_GO_LIVE = 'ENABLE_GO_LIVE';
export const TOGGLE_LOCAL_AUDIO = 'TOGGLE_LOCAL_AUDIO';
export const TOGGLE_LOCAL_VIDEO = 'TOGGLE_LOCAL_VIDEO';
export const TOGGLE_CHAT = 'TOGGLE_CHAT';
export const START_COUNTDOWN = 'START_COUNTDOWN';
export const TICK_COUNTDOWN = 'TICK_COUNTDOWN';
export const END_BROADCAST = 'END_BROADCAST';
export const RESET_LIVE_STATE = 'RESET_LIVE_STATE';
export const SET_POLL_INTERVAL_ID = 'SET_POLL_INTERVAL_ID';
export const CLEAR_POLL_INTERVAL_ID = 'CLEAR_POLL_INTERVAL_ID';
export const SET_VIEWERS = 'SET_VIEWERS';
export const SHARE_URL = 'SHARE_URL';

export const TRANSITION_BROADCAST_REQUEST = 'TRANSITION_BROADCAST_REQUEST';
export const TRANSITION_BROADCAST_SUCCESS = 'TRANSITION_BROADCAST_SUCCESS';
export const TRANSITION_BROADCAST_FAIL = 'TRANSITION_BROADCAST_FAIL';

export const JOIN_CHANNEL = 'JOIN_CHANNEL';
export const LEAVE_CHANNEL = 'LEAVE_CHANNEL';

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAIL = 'FETCH_COMMENTS_FAIL';

/**************************************************
* Action Creators
**************************************************/

export const shareUrl = (url = '') => ({
  type: SHARE_URL,
  payload: {
    url
  }
})

export const setViewers = viewerSource => ({
  type: SET_VIEWERS,
  payload: {
    viewerSource
  }
})

export const setPollIntervalId = pollIntervalId => ({
  type: SET_POLL_INTERVAL_ID,
  payload: {
    pollIntervalId
  }
})

export const clearPollIntervalId = () => ({
  type: CLEAR_POLL_INTERVAL_ID,
  payload: {
    pollIntervalId: null
  }
})

export const enableGoLive = () => ({
  type: ENABLE_GO_LIVE,
  payload: {
    shouldEnableGoLive: true
  }
});

export const joinChannel = () => ({
  type: JOIN_CHANNEL,
  payload: {
    connected: true,
    connectionAttempted: true,
    isLoading: false,
    isLive: false
  }
});

export const leaveChannel = () => ({
  type: LEAVE_CHANNEL,
  payload: {
    connected: false,
    connectionAttempted: true
  }
});

export const toggleChat = () => ({
  type: TOGGLE_CHAT
});

export const toggleLocalVideo = () => ({
  type: TOGGLE_LOCAL_VIDEO
});

export const toggleLocalAudio = () => ({
  type: TOGGLE_LOCAL_AUDIO
});

export const startCountdown = () => ({
  type: START_COUNTDOWN,
  payload: {
    showCountdown: true,
    countdown: 3,
    isLoading: true
  }
});

export const tickCountdown = () => ({
  type: TICK_COUNTDOWN
});

export const endBroadcast = () => ({
  type: END_BROADCAST
});

export const resetLiveState = () => ({
  type: RESET_LIVE_STATE
});

export const transitionBroadcastRequest = () => ({
  type: TRANSITION_BROADCAST_REQUEST,
  payload: {
    isLoading: true
  }
});

export const transitionBroadcastSuccess = (status = null) => ({
  type: TRANSITION_BROADCAST_SUCCESS,
  payload: {
    isLoading: false,
    status
  }
});

export const transitionBroadcastFail = (error = '') => ({
  type: TRANSITION_BROADCAST_FAIL,
  payload: {
    isLoading: false,
    error
  }
});

export const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST,
  payload: {
    isLoading: true
  }
});

export const fetchCommentsSuccess = (messages) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: {
    isLoading: false,
    messages
  }
});

export const fetchCommentsFail = (error = '') => ({
  type: FETCH_COMMENTS_FAIL,
  payload: {
    isLoading: false,
    error
  }
});

