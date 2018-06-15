import liveReducer, { defaultState } from 'reducers/live';

describe('liveReducer()', () => {
  test('returns default state', () => {
    const actual = liveReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(actual).toEqual(defaultState);
  });
});
