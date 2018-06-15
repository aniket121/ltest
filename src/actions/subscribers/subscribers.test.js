import subscriberReducer, { defaultState } from 'reducers/subscribers';
import {
  fetchSubscribersRequest,
  fetchSubscribersSuccess,
  fetchSubscribersFail
} from 'actions/subscribers/types';

const createState = settings => ({
  ...defaultState,
  ...settings
});

describe('actions: subscribers', () => {
  describe('fetchSubscribers', () => {
    test('request', () => {
      const actual = subscriberReducer(undefined, fetchSubscribersRequest());
      const expected = createState({ isLoading: true });
      expect(actual).toEqual(expected);
    });

    test('success', () => {
      const subscribers = [
        { email: 'a@a.com', subscriberId: 'id-a', beta: false },
        { email: 'b@b.com', subscriberId: 'id-b', beta: false },
        { email: 'c@c.com', subscriberId: 'id-c', beta: false }
      ];
      const state = createState({ isLoading: true });
      const actual = subscriberReducer(
        state,
        fetchSubscribersSuccess(subscribers)
      );
      const expected = createState({ isLoading: false, subscribers });
      expect(actual).toEqual(expected);
    });

    test('fail', () => {
      const error = { message: 'Failed to fetch subscribers' };
      const state = createState({ isLoading: true });
      const actual = subscriberReducer(state, fetchSubscribersFail(error));
      const expected = createState({
        isLoading: false,
        error
      });
      expect(actual).toEqual(expected);
    });
  });
});
