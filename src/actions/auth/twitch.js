import config from 'config';
import { popupWindow } from 'actions/auth/types';

export const twitchLogin = () => {
  const {
    API_URL,
    CLIENT_ID,
    REDIRECT_URI,
    RESPONSE_TYPE,
    SCOPE
  } = config.twitch;

  const _url =
    API_URL +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=${RESPONSE_TYPE}` +
    `&scope=${encodeURIComponent(SCOPE)}`;

  return new Promise((resolve, reject) => {
    const win = popupWindow(_url, 'twitchredirect');
    const pollTimer = window.setInterval(async () => {
      try {
        if (win.document.URL.indexOf(REDIRECT_URI) !== -1) {
          window.clearInterval(pollTimer);

          let url = win.document.URL;
          let hash = url.split('#')[1];
          let access_token = hash.split('&')[0].split('=')[1];

          const token = {
            provider: 'twitch',
            content: {
              access_token
            }
          };

          win.close();

          try {
            resolve(token);
          } catch (e) {
            reject('Failed to store twitch token');
          }
        }
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  });
};
