import {
  saveUserToken,
  fetchUserToken,
  logoutUser,
  errorUserToken
} from './types';
import authReducer, { defaultState } from 'reducers/auth';

const createState = state => ({
  ...defaultState,
  ...state
});

const createCache = cache => ({
  identityId: null,
  identityProviders: null,
  ...cache
});

describe('Actions: auth', () => {
  test('saveUserToken()', () => {
    const params = {
      userToken: 'googleTokenZZZZ',
      userTokenProvider: 'google',
      userTokenExpiry: Date.now() + 3600000
    };

    const actual = authReducer(undefined, saveUserToken(params));

    const expected = {
      ...createState(),
      ...params
    };

    expect(actual).toEqual(expected);
  });

  test('fetchUserToken()', () => {
    const actual = authReducer(undefined, fetchUserToken());
    const expected = createState({
      isLoading: true
    });
    expect(actual).toEqual(expected);
  });

  test('logoutUser()', () => {
    const state = createState({
      userToken: 'linkedinToken',
      userTokenProvider: 'linkedin'
    });
    const actual = authReducer(state, logoutUser());
    const expected = createState({
      userToken: null,
      userTokenProvider: null
    });
    expect(actual).toEqual(expected);
  });

  test('errorUserToken()', () => {
    const actual = authReducer(undefined, errorUserToken());
    const expected = createState();
    expect(actual).toEqual(expected);
  });

  test('errorUserToken(error)', () => {
    const error = 'An error occurred';
    const actual = authReducer(undefined, errorUserToken(error));
    const expected = createState({
      error
    });
    expect(actual).toEqual(expected);
  });
});
