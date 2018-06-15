import subscriberReducer, { defaultState } from 'reducers/subscribers';

describe('subscribers reducer', () => {
  test('returns default state', () => {
    const actual = subscriberReducer(undefined, { type: 'SOME_ACTION' });
    const expected = defaultState;
    expect(actual).toEqual(expected);
  });
});
