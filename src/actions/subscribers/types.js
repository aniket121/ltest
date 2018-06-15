export const FETCH_SUBSCRIBERS_REQUEST = 'FETCH_SUBSCRIBERS_REQUEST';
export const FETCH_SUBSCRIBERS_SUCCESS = 'FETCH_SUBSCRIBERS_SUCCESS';
export const FETCH_SUBSCRIBERS_FAIL = 'FETCH_SUBSCRIBERS_FAIL';

export const GRANT_BETA_REQUEST = 'GRANT_BETA_REQUEST';
export const GRANT_BETA_SUCCESS = 'GRANT_BETA_SUCCESS';
export const GRANT_BETA_FAIL = 'GRANT_BETA_FAIL';

export const DELETE_SUBSCRIBER_REQUEST = 'DELETE_SUBSCRIBER_REQUEST';
export const DELETE_SUBSCRIBER_SUCCESS = 'DELETE_SUBSCRIBER_SUCCESS';
export const DELETE_SUBSCRIBER_FAIL = 'DELETE_SUBSCRIBER_FAIL';

export const fetchSubscribersRequest = () => ({
  type: FETCH_SUBSCRIBERS_REQUEST,
  payload: {
    isLoading: true
  }
});

export const fetchSubscribersSuccess = subscribers => ({
  type: FETCH_SUBSCRIBERS_SUCCESS,
  payload: {
    isLoading: false,
    subscribers
  }
});

export const fetchSubscribersFail = error => ({
  type: FETCH_SUBSCRIBERS_FAIL,
  payload: {
    isLoading: false,
    error
  }
});

export const grantBetaRequest = () => ({
  type: GRANT_BETA_REQUEST,
  payload: {
    isLoading: true
  }
});

export const grantBetaSuccess = subscriber => ({
  type: GRANT_BETA_SUCCESS,
  payload: {
    isLoading: false,
    subscriber
  }
});

export const grantBetaFail = error => ({
  type: GRANT_BETA_FAIL,
  payload: {
    isLoading: false,
    error
  }
});

export const deleteSubscriberRequest = () => ({
  type: DELETE_SUBSCRIBER_REQUEST,
  payload: {
    isLoading: true
  }
});

export const deleteSubscriberSuccess = subscriberId => ({
  type: DELETE_SUBSCRIBER_SUCCESS,
  payload: {
    isLoading: false,
    subscriberId
  }
});

export const deleteSubscriberFail = error => ({
  type: DELETE_SUBSCRIBER_FAIL,
  payload: {
    isLoading: false,
    error
  }
});
