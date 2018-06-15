import config from 'config';
import { exchangeCodeForToken } from 'actions/auth/tokens';
import { popupWindow } from 'actions/auth/types';

export const loginDialog = () => {
  console.log('actions.loginDialogGoogle');
  const {
    API_URL,
    CLIENT_ID,
    REDIRECT_URI,
    RESPONSE_TYPE,
    SCOPE
  } = config.youtube;

  return new Promise((resolve, reject) => {
    window.onload = () => {
      const auth2 = window.gapi.auth2.getAuthInstance();

      const options = {
        response_type: 'permission',
        redirect_uri: REDIRECT_URI,
        fetch_basic_profile: true,
        prompt: '',
        SCOPE
      };

      auth2.signIn(options).then(
        res => {
          const profile = {
            name: res.getBasicProfile().getName(),
            email: res.getBasicProfile().getEmail(),
            imageUrl: res.getBasicProfile().getImageUrl() 
          };

          resolve({
            accessToken: res.getAuthResponse().id_token,
            profile
          });
        },
        err => reject('Failed to authenticate with Google')
      );
    };
  });
};

export const handleGoogleResponse = response => {
  if (response.accessToken) {
    return {
      userToken: response.tokenId,
      profile: {
        email: response.getBasicProfile().getEmail(),
        name: response.getBasicProfile().getName(),
       imageUrl: response.getBasicProfile().getImageUrl() 
      }
    };
  } else {
    console.log('There was a problem logging you in with Google.');
    return null;
  }
};

export const youtubeLogin = () => {
  console.log('youtubeLogin');
  const { API_URL, CLIENT_ID, REDIRECT_URI, SCOPE } = config.youtube;

  const ENCODED_REDIRECT_URI = encodeURIComponent(REDIRECT_URI);

  const _url =
    API_URL +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${ENCODED_REDIRECT_URI}` +
    `&response_type=code` +
    `&access_type=offline` +
    `&scope=${encodeURIComponent(SCOPE)}` +
    `&prompt=consent`;

  return new Promise((resolve, reject) => {
    const win = popupWindow(_url, 'youtuberedirect');
    const pollTimer = window.setInterval(async () => {
      try {
        if (win.document.URL.indexOf(REDIRECT_URI) !== -1) {
          window.clearInterval(pollTimer);
          let url = win.document.URL;
          let search = url.split('?')[1];
          let code = search.split('=')[1];
          win.close();

          try {
            const results = await exchangeCodeForToken(
              decodeURIComponent(code)
            );
            resolve(results.token);
          } catch (e) {
            reject('Failed to store youtube token');
          }
        }
      } catch (e) {
        // console.error(e);
      }
    }, 1000);
  });
};
