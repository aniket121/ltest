import streamGroupReducer, { defaultState } from 'reducers/stream-groups';

const createState = state => ({
  ...defaultState,
  ...state
});

describe('streamGroupReducer()', () => {
  test('returns default state', () => {
    const actual = streamGroupReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const expected = createState();
    expect(actual).toEqual(expected);
  });
})
