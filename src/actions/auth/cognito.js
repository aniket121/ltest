import config from '../../config';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';

export const getUserPoolUser = () => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  });
  return userPool.getCurrentUser();
}

export const login = currentUser => {
  return new Promise((resolve, reject) => {
    currentUser.getSession(function(err, session) {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        accessToken: session.getIdToken().getJwtToken(),
        profile: { email: currentUser.username }
      });
    });
  });
}

export const loginUserWithEmail = (username, password) => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  });

  const authenticationData = {
    Username: username,
    Password: password
  };

  const user = new CognitoUser({ Username: username, Pool: userPool });
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  return new Promise((resolve, reject) => (
    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log(result.getIdToken().getJwtToken(), username);
        resolve({
          accessToken: result.getIdToken().getJwtToken(),
          profile: {
            email: username
          }
        })
      },
      onFailure: (err) => reject(err),
    })
  ));
}
