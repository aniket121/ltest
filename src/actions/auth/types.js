export const SAVE_USER_TOKEN = 'SAVE_USER_TOKEN';
export const FETCH_USER_TOKEN = 'FETCH_USER_TOKEN';
export const ERROR_USER_TOKEN = 'ERROR_USER_TOKEN';
export const LOGOUT_USER = 'LOGOUT_USER';

/**************************************************
* Action Creators
**************************************************/
export const saveUserToken = (
  {
    userToken = null,
    userTokenProvider = null,
    userTokenExpiry = Date.now() + 3600 * 1000
  } = {}
) => ({
  type: SAVE_USER_TOKEN,
  payload: {
    userToken,
    userTokenProvider,
    userTokenExpiry,
    isLoading: false
  }
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const fetchUserToken = () => ({
  type: FETCH_USER_TOKEN,
  payload: {
    isLoading: true
  }
});

export const errorUserToken = (error = '') => ({
  type: ERROR_USER_TOKEN,
  payload: {
    error,
    isLoading: false
  }
});

export const popupWindow = (url, title, w = 580, h = 400) => {
  var left = screen.width / 2 - w / 2;
  var top = screen.height / 2 - h / 2;
  return window.open(
    url,
    title,
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left
  );
};
