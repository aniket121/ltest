import AWS from 'aws-sdk';
import apigClientFactory from 'aws-api-gateway-client';
import config from '../config';
import store from 'store';
import { refreshLoginCredentials } from 'actions/auth';

const getAuthenticator = provider => {
  switch (provider) {
    case 'google':
      return 'accounts.google.com';
    case 'facebook':
      return 'graph.facebook.com';
    default:
      return `cognito-idp.${config.cognito.REGION}.amazonaws.com/${config
        .cognito.USER_POOL_ID}`;
  }
};

export const getAwsCredentials = (userToken, provider) => {
  if (
    AWS.config.credentials &&
    Date.now() < AWS.config.credentials.expireTime - 60000
  ) {
    return;
  }

  const authenticator = getAuthenticator(provider);

  AWS.config.update({ region: config.cognito.REGION });

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
    Logins: {
      [authenticator]: userToken
    }
  });

  return new Promise(resolve => {
    AWS.config.credentials.refresh(err => {
      if (err) {
        console.error(err);
      }
      resolve();
    });
  });
};

export const invokeApi = async ({
  path,
  method = 'GET',
  params = {},
  body = {},
  additionalParams = {},
  userTokenOverride,
  userTokenProviderOverride
}) => {
  let { userToken, userTokenProvider, userTokenExpiry } = store.getState().auth;

  if (userTokenExpiry && userTokenExpiry < Date.now()) {
    try {
      await refreshLoginCredentials(userTokenProvider)(store.dispatch);
    } catch (e) {
      console.log('Failed to refresh login credentials');
      console.error(e);
    }
  }

  userToken = !!userToken ? userToken : userTokenOverride;

  userTokenProvider = !!userTokenProvider
    ? userTokenProvider
    : userTokenProviderOverride;

  await getAwsCredentials(userToken, userTokenProvider);

  const apigClient = apigClientFactory.newClient({
    accessKey: AWS.config.credentials.accessKeyId,
    secretKey: AWS.config.credentials.secretAccessKey,
    sessionToken: AWS.config.credentials.sessionToken,
    region: config.cognito.REGION,
    invokeUrl: config.apiGateway.URL
  });

  const results = await apigClient.invokeApi(
    params,
    path,
    method,
    additionalParams,
    body
  );

  return results.data;
};

export const clearCache = () => {
  AWS.config.credentials = null;
  delete localStorage[
    `aws.cognito.identity-id.${config.cognito.IDENTITY_POOL_ID}`
  ];
  delete localStorage[
    `aws.cognito.identity-providers.${config.cognito.IDENTITY_POOL_ID}`
  ];
};

export const getCachedItems = (overrides = {}) => ({
  identityId:
    localStorage[`aws.cognito.identity-id.${config.cognito.IDENTITY_POOL_ID}`],
  identityProvider:
    localStorage[
      `aws.cognito.identity-providers.${config.cognito.IDENTITY_POOL_ID}`
    ],
  ...overrides
});
