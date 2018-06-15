import appReducer, { defaultState } from 'reducers/app';
import {
  openModal,
  closeModal,
  changeModalType
} from 'actions/app/types';

const createState = state => ({
  ...defaultState,
  ...state
});

describe('Actions: app', () => {
  test('openModal()', () => {
    const actual = appReducer(undefined, openModal())
    const expected = {
      ...defaultState,
      open: true
    };
    expect(actual).toEqual(expected);
  });

  test('closeModal()', () => {
    const state = createState({ open: true });
    const actual = appReducer(undefined, closeModal())
    const expected = {
      ...defaultState,
      open: false
    };
    expect(actual).toEqual(expected);
  });

  test('changeModalType(params)', () => {
    const params = { modalType: 'some_modal_type' };
    const actual = appReducer(undefined, changeModalType(params.modalType))
    const expected = {
      ...defaultState,
      ...params
    };
    expect(actual).toEqual(expected);
  });
})
