import appReducer, { defaultState } from 'reducers/app';

describe('appReducer()', () => {
  test('with default state', () => {
    const actual = appReducer(undefined, { type: 'UNKNOWN ACTION' });
    const expected = defaultState;
    expect(actual).toEqual(expected);
  })
});
