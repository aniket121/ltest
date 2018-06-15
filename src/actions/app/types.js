export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const CHANGE_MODAL_TYPE = 'CHANGE_MODAL_TYPE';
export const SELECT_GROUP = 'SELECT_GROUP';
export const SET_SHARE_LINK = 'SET_SHARE_LINK';

/*
* Action Creators
*/

export const openModal = () => ({
  type: OPEN_MODAL
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const changeModalType = (modalType = '') => ({
  type: CHANGE_MODAL_TYPE,
  payload: {
    modalType,
  }
});

export const setShareLink = (shareLink = '') => ({
  type: SET_SHARE_LINK,
  payload: {
    shareLink
  }
});

export const selectGroup = (selectedGroup = null) => ({
  type: SELECT_GROUP,
  payload: {
    selectedGroup
  }
});
