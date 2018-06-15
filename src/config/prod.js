const REDIRECT_URI = 'https://app.livepin.tv/redirect';

export default {
  apiGateway: {
    URL: 'https://s23jxsuno2.execute-api.us-west-2.amazonaws.com/prod',
  },
  cognito: {
    USER_POOL_ID : "us-west-2_gILfPO4vP",
    APP_CLIENT_ID : "49i858locga0qo42eee41k0t2n",
    REGION: 'us-west-2',
    IDENTITY_POOL_ID: 'us-west-2:be437f96-7b21-4604-9950-e9442de6d18a'
  },
  facebook: {
    API_URL: 'https://www.facebook.com/v2.9',
    APP_ID: '626384614228286',
    APP_SECRET: 'a3a6f5c6410d00f2d578cb8093d364de',
    REDIRECT_URI,
    SCOPE: 'email,publish_actions,user_events,manage_pages,publish_pages,user_managed_groups',
    RESPONSE_TYPE: 'token'
  },
  youtube: {
    API_URL: 'https://accounts.google.com/o/oauth2/auth',
    CLIENT_ID: '107510114528-m01bp0nvdh39ob96pgagh25aou0rck3k.apps.googleusercontent.com',
    REDIRECT_URI,
    SCOPE: [
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/youtube'
    ].join(' ')
  },
  twitch: {
    API_URL: 'https://api.twitch.tv/kraken/oauth2/authorize',
    CLIENT_ID: 'n9zzuxfxh86eecol0dc24nlypn12dq',
    REDIRECT_URI,
    SCOPE: ['channel_read', 'channel_editor', 'chat_login'].join(' '),
    RESPONSE_TYPE: 'token'
  },
  agora: {
    APP_ID: '27e995a99db54a13a82f0b6a6ba58fae'
  },
  BASE_URL: 'https://app.livepin.tv'
};
