import authReducer, { defaultState } from 'reducers/auth';

const createState = state => ({
  ...defaultState,
  ...state
});

const createAction = action => ({
  type: 'TEST_ACTION',
  payload: {},
  ...action
});

describe('authReducer()', () => {
  test('should return default state for unknown actions', () => {
    const defaultState = createState();
    const action = createAction();
    const actual = authReducer(undefined, action);
    expect(actual).toEqual(defaultState);
  });

  test('should update state where it is previously defined', () => {
    const state = createState({
      userToken: 'twitterTokenXXXX',
      userTokenProvider: 'twitter'
    });

    const action = createAction({
      type: 'SAVE_USER_TOKEN',
      payload: {
        userToken: 'facebookTokenYYYY',
        userTokenProvider: 'facebook'
      }
    })

    const actual = authReducer(state, action);

    expect(actual).toEqual({
      ...state,
      ...action.payload
    });
  })
})
