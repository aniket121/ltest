import config from 'config';
import request from 'request';
import { popupWindow } from 'actions/auth/types';

export const loginDialog = () => {
  console.log('actions.loginDialogFacebook');
  const {
    API_URL,
    APP_ID,
    REDIRECT_URI,
    RESPONSE_TYPE,
    SCOPE
  } = config.facebook;

  let _url =
    `${API_URL}/dialog/oauth?` +
    `client_id=${APP_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=${RESPONSE_TYPE}` +
    `&scope=${SCOPE}` +
    `&display=popup`;

  return new Promise((resolve, reject) => {
    const win = popupWindow(_url, 'facebookredirect');
    const pollTimer = window.setInterval(async () => {
      try {
        if (win.document.URL.indexOf(REDIRECT_URI) !== -1) {
          window.clearInterval(pollTimer);
          let url = win.document.URL;
          let hash = url.split('#')[1];
          let [accessToken, expiresIn] = hash
            .split('&')
            .map(field => field.split('=')[1]);

          win.close();

          const token = {
            provider: 'facebook',
            content: {
              accessToken,
              expiresIn
            }
          };

          try {
            const profile = await getFacebookProfile(accessToken);
            resolve({ accessToken, profile });
          } catch (e) {
            reject('Failed to fetch Facebook profile');
          }
        }
      } catch (e) {
        reject('Failed to acquire Facebook access token');
      }
    }, 1000);
  });
};

function getFacebookProfile(token) {
  const options = {
    url: `${config.GRAPH_API}/me?fields=name,email,picture{url}&access_token=${token}`
  };
  console.log(options);
  return new Promise((resolve, reject) => {
    request.get(options, (err, response, body) => {
      if (err) {
        reject(err);
      }

      const { name, email } = JSON.parse(body);
      resolve({ name, email });
    });
  });
}

export const handleFacebookResponse = response => {
  if (response.accessToken) {
    return {
      userToken: response.accessToken,
      profile: {
        email: response.email,
        name: response.name
      }
    };
  } else {
    console.log('There was a problem logging you in.');
    return null;
  }
};

export const facebookLiveLogin = () => dispatch => {
  const {
    API_URL,
    APP_ID,
    SCOPE,
    REDIRECT_URI,
    RESPONSE_TYPE
  } = config.facebook;

  let _url =
    `${API_URL}/dialog/oauth?` +
    `client_id=${APP_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=${RESPONSE_TYPE}` +
    `&scope=${SCOPE}` +
    `&display=popup`;

  return new Promise((resolve, reject) => {
    const win = popupWindow(_url, 'facebookredirect');
    const pollTimer = window.setInterval(async () => {
      try {
        if (win.document.URL.indexOf(REDIRECT_URI) !== -1) {
          window.clearInterval(pollTimer);
          let url = win.document.URL;
          let hash = url.split('#')[1];
          let [accessToken, expiresIn] = hash
            .split('&')
            .map(field => field.split('=')[1]);

          win.close();

          const token = {
            provider: 'facebook',
            content: {
              accessToken,
              expiresIn
            }
          };

          try {
            resolve(token);
          } catch (e) {
            console.error(e);
            reject('Failed to store facebook token');
          }
        }
      } catch (e) {
        // console.error(e);
      }
    }, 1000);
  });
};
