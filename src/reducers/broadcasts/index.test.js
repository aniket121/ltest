import broadcastReducer, { defaultState } from 'reducers/broadcasts';

describe('broadcastReducer()', () => {
  test('returns default state', () => {
    const actual = broadcastReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const expected = defaultState;
    expect(actual).toEqual(expected);
  });
})
