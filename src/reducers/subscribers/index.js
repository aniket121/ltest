import {
  FETCH_SUBSCRIBERS_REQUEST,
  FETCH_SUBSCRIBERS_SUCCESS,
  FETCH_SUBSCRIBERS_FAIL,
  GRANT_BETA_REQUEST,
  GRANT_BETA_SUCCESS,
  GRANT_BETA_FAIL,
  DELETE_SUBSCRIBER_REQUEST,
  DELETE_SUBSCRIBER_SUCCESS,
  DELETE_SUBSCRIBER_FAIL,
} from 'actions/subscribers/types';

export const defaultState = {
  isLoading: false,
  subscribers: [],
  error: null
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_SUBSCRIBER_SUCCESS:
      const { subscriberId } = payload;
      const indexToDelete = state.subscribers.findIndex(
        sub => sub.subscriberId === subscriberId
      );

      return {
        ...state,
        ...payload,
        subscribers: [
          ...state.subscribers.slice(0, indexToDelete),
          ...state.subscribers.slice(indexToDelete + 1)
        ]
      };
    case GRANT_BETA_SUCCESS:
      const { subscriber } = payload;

      const indexOfUpdatedSubscriber = state.subscribers.findIndex(
        sub => sub.subscriberId === subscriber.subscriberId
      );

      return {
        ...state,
        ...payload,
        subscribers: [
          ...state.subscribers.slice(0, indexOfUpdatedSubscriber),
          subscriber,
          ...state.subscribers.slice(indexOfUpdatedSubscriber + 1)
        ]
      };
    case DELETE_SUBSCRIBER_REQUEST:
    case DELETE_SUBSCRIBER_FAIL:
    case FETCH_SUBSCRIBERS_REQUEST:
    case FETCH_SUBSCRIBERS_SUCCESS:
    case FETCH_SUBSCRIBERS_FAIL:
    case GRANT_BETA_REQUEST:
    case GRANT_BETA_FAIL:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};
