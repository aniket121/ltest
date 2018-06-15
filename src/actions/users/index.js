import { invokeApi } from 'libs/aws';
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFail,
  createUserRequest,
  createUserSuccess,
  createUserFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail
} from 'actions/users/types';

export const fetchUser = (
  email,
  userTokenOverride,
  userTokenProviderOverride
) => async dispatch => {
  dispatch(fetchUserRequest());
  try {
    const user = await invokeApi({
      path: '/users',
      additionalParams: {
        queryParams: {
          email
        }
      },
      userTokenOverride,
      userTokenProviderOverride
    });
    dispatch(fetchUserSuccess(user));
    return user;
  } catch (error) {
    console.error(error);
    dispatch(fetchUserFail('Could not find user'));
    return null;
  }
};

export const createUser = (
  user,
  userTokenOverride,
  userTokenProviderOverride
) => async dispatch => {
  dispatch(createUserRequest());
  try {
    const newUser = await invokeApi({
      path: '/users',
      method: 'post',
      body: user,
      userTokenOverride,
      userTokenProviderOverride
    });
    dispatch(createUserSuccess(newUser));
    return newUser;
  } catch (error) {
    console.error(error);
    dispatch(createUserFail('Failed to create new user'));
    return null;
  }
};

export const updateUser = (
  user,
  userTokenOverride,
  userTokenProviderOverride
) => async dispatch => {
  console.log("action.users.updateUser");
  dispatch(updateUserRequest());
  try {
    const results = await invokeApi({
      path: '/users',
      method: 'put',
      body: user,
      userTokenOverride,
      userTokenProviderOverride
    });
    console.log("Update successful");
    dispatch(updateUserSuccess(results.user));
    return results.user;
  } catch (error) {
    console.error(error);
    console.log('Failed to update user login');
    dispatch(updateUserFail('Failed to update user login'));
    return null;
  }
};
