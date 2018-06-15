import { push } from 'react-router-redux';
import { invokeApi, getCachedItems, clearCache } from 'libs/aws';
import {
  loginDialog as loginDialogFacebook,
  handleFacebookResponse
} from './facebook';
import {
  loginDialog as loginDialogGoogle,
  youtubeLogin,
  handleGoogleResponse
} from './google';
import { twitchLogin } from './twitch';
import {
  login as loginWithCognito,
  loginUserWithEmail,
  getUserPoolUser
} from './cognito';
import {
  saveUserToken,
  logoutUser,
  fetchUserToken,
  errorUserToken
} from './types';
import { fetchUser, createUser, updateUser } from 'actions/users';

/**************************************************
* Dispatch callers
**************************************************/

const setLivepinUser = ({
  email,
  name,
  imageUrl,
  aboutMe,
  provider,
  userToken
}) => async dispatch => {
  console.log('action.auth.setLivepinUser');
  const user = await fetchUser(email, userToken, provider)(dispatch);
  
  if (!user) {
    await createUser(
      {
        email,
        name,
        imageUrl,
        provider
      },
      userToken,
      provider
    )(dispatch);
  } else {
    await updateUser(
      {
        email,
        name: user.name ? user.name : name,
        imageUrl: imageUrl ? imageUrl : user.imageUrl,
        aboutMe: user.aboutMe,
        provider
      },
      userToken,
      provider
    )(dispatch);
  }
};

export const loginUser = (username, password) => async dispatch => {
  dispatch(fetchUserToken());
  try {
    let {
      accessToken: userToken,
      profile: { email }
    } = await loginUserWithEmail(username, password);

    await setLivepinUser({
      email,
      userToken,
      provider: 'cognito'
    })(dispatch);

    dispatch(saveUserToken({ userToken }));
  } catch (e) {
    dispatch(errorUserToken(e.message));
    return e;
  }
};

export const signupUser = ({
  userToken,
  profile: { email }
}) => async dispatch => {
  await setLivepinUser({
    email,
    userToken,
    provider: 'cognito'
  })(dispatch);

  dispatch(saveUserToken({ userToken }));
};

export const loginWithGoogle = response => async dispatch => {
  dispatch(fetchUserToken());
  //console.log("loginWithGoogle "+JSON.stringify(response))
  const { userToken, profile: { email, name, imageUrl } } = handleGoogleResponse(    
    response
  );
  if (userToken) {
    await setLivepinUser({
      email,
      name,
      imageUrl,
      userToken,
      provider: 'google'
    })(dispatch);

    dispatch(
      saveUserToken({
        userToken,
        userTokenProvider: 'google'
      })
    );
  } else {
    dispatch(errorUserToken('Error logging in with Google'));
  }
};

export const loginWithFacebook = response => async dispatch => {
  console.log('action.auth.loginWithFacebook');
  dispatch(fetchUserToken());

  const { userToken, profile: { email, name } } = handleFacebookResponse(
    response
  );
  
  if (userToken) {
    await setLivepinUser({
      email,
      name,
      userToken,
      provider: 'facebook',
      imageUrl: response.picture.data.url
    })(dispatch);

    dispatch(
      saveUserToken({
        userToken,
        userTokenProvider: 'facebook'
      })
    );
  } else {
    dispatch(errorUserToken('Error logging in with Facebook'));
  }
};

export const loginWithTwitch = () => async dispatch => {
  const results = await twitchLogin();
  return results;
};

export const loginWithYoutube = () => async dispatch => {
  const results = await youtubeLogin();
  return results;
};

export const logout = () => dispatch => {
  const currentUser = getCurrentUser();
  if (currentUser.signOut) {
    currentUser.signOut();
  }

  clearCache();

  dispatch(logoutUser());
  dispatch(push('/login'));
};

export const initializeApp = () => async (dispatch, getState) => {
  console.log('initializeApp');
  dispatch(fetchUserToken());
  const currentUser = getCurrentUser();

  if (currentUser === null) {
    dispatch(saveUserToken());
    return;
  }

  try {
    const {
      accessToken: userToken,
      profile: { email, name }
    } = await getUserToken(currentUser);
    const userTokenProvider = currentUser.provider;

    await setLivepinUser({
      email,
      name,
      userToken,
      provider: userTokenProvider
    })(dispatch);

    dispatch(
      saveUserToken({
        userToken,
        userTokenProvider
      })
    );
  } catch (error) {
    console.error(error);
    dispatch(errorUserToken(error));
  }
};

function getCognitoIdentity(identityId, identityProvider) {
  switch (identityProvider) {
    case 'accounts.google.com':
      return {
        identityId,
        provider: 'google'
      };
    case 'graph.facebook.com':
      return {
        identityId,
        provider: 'facebook'
      };
    default: {
      return getUserPoolUser();
    }
  }
}

function getCurrentUser(overrides = {}) {
  const { identityId, identityProvider } = getCachedItems(overrides);
  return getCognitoIdentity(identityId, identityProvider);
}

async function getUserToken(currentUser) {
  switch (currentUser.provider) {
    case 'facebook':
      return await loginDialogFacebook();
    case 'google':
      return await loginDialogGoogle();
    default:
      return await loginWithCognito(currentUser);
  }
}

export const refreshLoginCredentials = () => async dispatch => {
  console.log('refreshLoginCredentials');
  dispatch(fetchUserToken());
  const currentUser = getCurrentUser();

  try {
    const {
      accessToken: userToken,
      profile: { email, name }
    } = await getUserToken(currentUser);
    const userTokenProvider = currentUser.provider;

    dispatch(
      saveUserToken({
        userToken,
        userTokenProvider
      })
    );
  } catch (error) {
    console.error(error);
    dispatch(errorUserToken(error));
  }
};


export const updateProfile = (email, name, userToken, provider, aboutMe, imageUrl) => async dispatch => {
  console.log('action.auth.updateProfile');
  console.log(name);
  await updateUser(
      {
        email,
        name,
        imageUrl,
        aboutMe,
        provider
      },
      userToken,
      provider
    )(dispatch);
    return true;
}