const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://app-staging.livepin.tv';

const REDIRECT_URI = `${BASE_URL}/redirect`;

export default {
  apiGateway: {
    URL: 'https://nfp18lqpt1.execute-api.us-west-2.amazonaws.com/stage'
  },
  cognito: {
    USER_POOL_ID: 'us-west-2_YLBpi7RyE',
    APP_CLIENT_ID: 'ng56ntrj61qvstjl0br8vajuh',
    REGION: 'us-west-2',
    IDENTITY_POOL_ID: 'us-west-2:bb6caf17-225e-4552-b269-2d09f0d6ca45'
  },
  facebook: {
    API_URL: 'https://www.facebook.com/v2.9',
    APP_ID: '148618898995562',
    APP_SECRET: '6760c9e36336e456a28fbc6eaded5107',
    REDIRECT_URI,
    SCOPE:
      'email,user_events,manage_pages,user_managed_groups,publish_pages,publish_actions',
    RESPONSE_TYPE: 'token'
  },
  youtube: {
    API_URL: 'https://accounts.google.com/o/oauth2/auth',
    CLIENT_ID:
      '576547378161-r9tnra5gnkmglen2un841jtmiu3u2ag4.apps.googleusercontent.com',
    REDIRECT_URI,
    SCOPE: [
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/youtube'
    ].join(' ')
  },
  twitch: {
    API_URL: 'https://api.twitch.tv/kraken/oauth2/authorize',
    CLIENT_ID: '91m66qmpkgdd5hup5g6z7o73fnw0ld',
    REDIRECT_URI,
    SCOPE: ['channel_read', 'channel_editor', 'chat_login'].join(' '),
    RESPONSE_TYPE: 'token'
  },
  agora: {
    APP_ID: '27e995a99db54a13a82f0b6a6ba58fae'
  },
  BASE_URL
};
