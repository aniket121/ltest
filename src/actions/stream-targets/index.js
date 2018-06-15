import { push } from 'react-router-redux';
import { invokeApi } from 'libs/aws';
import {
  fetchStreamTargetsRequest,
  fetchStreamTargetsSuccess,
  fetchStreamTargetsFail,
  createStreamTargetRequest,
  createStreamTargetSuccess,
  createStreamTargetFail,
  deleteStreamTargetRequest,
  deleteStreamTargetSuccess,
  deleteStreamTargetFail,
  storeTokenForTarget
} from 'actions/stream-targets/types';

/**************************************************
* Dispatch callers
**************************************************/

export const fetchStreamTargets = streamGroupId => async dispatch => {
  dispatch(fetchStreamTargetsRequest());
  try {
    const streamTargets = await invokeApi({
      path: `/stream-groups/${streamGroupId}/stream-targets`
    });
    dispatch(fetchStreamTargetsSuccess(streamTargets));
  } catch (error) {
    console.error(error);
    dispatch(
      fetchStreamTargetsFail({ message: 'Error fetching stream targets' })
    );
  }
};

export const createStreamTarget = streamTarget => async dispatch => {
  dispatch(createStreamTargetRequest());
  try {
    const newStreamTarget = await invokeApi({
      path: '/stream-targets',
      method: 'POST',
      body: streamTarget
    });
    dispatch(createStreamTargetSuccess(newStreamTarget));
    dispatch(push(`/destinations/${newStreamTarget.streamGroupId}`));
  } catch (error) {
    let message = error.response.data.err.errors[0].message;
    message +=
      ' Follow the link below to enable your Youtube account for streaming.';
    let link = 'https://www.youtube.com/live_dashboard_splash';
    dispatch(createStreamTargetFail({ message, link }));
  }
};

export const deleteStreamTarget = streamTargetId => async (
  dispatch,
  getState
) => {
  dispatch(deleteStreamTargetRequest());

  try {
    const results = await invokeApi({
      path: `/stream-targets/${streamTargetId}`,
      method: 'DELETE'
    });
    dispatch(deleteStreamTargetSuccess(streamTargetId));
  } catch (error) {
    let message = '';
    if (error && error.err && error.err.code) {
      message = error.err.errors[0].reason;
    }
    dispatch(deleteStreamTargetFail({ message }));
  }
};

export function shouldRefreshToken(token, createdAt) {
  if (!token || !createdAt) {
    throw new Error('Stream target is missing access token');
  }

  const currentTime = Date.now();
  const expireTime = token.content.expiresIn * 1000 + Date.parse(createdAt);
  return currentTime > expireTime;
}

export { storeTokenForTarget };
