import streamTargetReducer, { defaultState } from 'reducers/stream-targets';

describe('streamTargetReducer()', () => {
  test('with default state', () => {
    const actual = streamTargetReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(actual).toEqual(defaultState);
  });
})
