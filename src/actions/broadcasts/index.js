import request from 'request';

import config from 'config';
import { push } from 'react-router-redux';
import { invokeApi } from 'libs/aws';
import {
	fetchBroadcastsRequest,
	fetchBroadcastsSuccess,
	fetchBroadcastsFail,
	fetchBroadcastRequest,
	fetchBroadcastSuccess,
	fetchBroadcastFail,
	createBroadcastRequest,
	createBroadcastSuccess,
	createBroadcastFail,
	deleteBroadcastRequest,
	deleteBroadcastSuccess,
	deleteBroadcastFail,
} from 'actions/broadcasts/types';
import { facebookLiveLogin } from 'actions/auth/facebook';
import { closeModal } from 'actions/app/types';

/**************************************************
* Dispatch callers
**************************************************/

export const fetchBroadcasts = () => async dispatch => {
	dispatch(fetchBroadcastsRequest());
	try {
		const broadcasts = await invokeApi({ path: '/broadcasts' });
		dispatch(fetchBroadcastsSuccess(broadcasts));
	} catch (error) {
		console.error(error);
		dispatch(fetchBroadcastsFail('Error fetching stream groups'));
	}
};

export const fetchBroadcast = broadcastId => async dispatch => {
	dispatch(fetchBroadcastRequest());
	try {
		const broadcast = await invokeApi({ path: `/broadcasts/${broadcastId}` });
		dispatch(fetchBroadcastSuccess(broadcast));
	} catch (error) {
		console.error(error);
		dispatch(fetchBroadcastFail(`Error fetching stream group ${broadcastId}`));
	}
};

export const setBroadcast = broadcast => dispatch => {
	dispatch(fetchBroadcastSuccess(broadcast));
};

export const shouldRefreshFacebookToken = streamTarget => {
	const created = Date.parse(streamTarget.createdAt);
	return Date.now() - config.SIXTY_DAYS > created;
};

export const fetchFacebookPages = async token => {
	const options = {
		url: `${config.GRAPH_API}/me/accounts?access_token=${token.content.accessToken}`,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	return new Promise((resolve, reject) => {
		request.get(options, async (err, response, body) => {
			if (err) {
				return reject(err);
			}
			const { data } = JSON.parse(body);
			resolve(data);
		});
	});
};

export const updateTargetsWithNewToken = (streamTargets, token) => {
	return Promise.all(
		streamTargets.map(async target => {
			let body;
			if (target.config.destType === 'page') {
				const pages = await fetchFacebookPages(token);
				const { access_token } = pages.find(page => page.id === target.config.destId);
				body = {
					config: target.config,
					pageAccessToken: access_token,
					token
				};
				console.log(body);
			} else {
				body = { token };
			}

			const params = {
				path: `/stream-targets/${target.streamTargetId}`,
				method: 'PUT',
				body,
			};

			return invokeApi(params);
		})
	);
};

export const validateTokenHealth = async (dispatch, state, groupId) => {
	const streamTargets = await invokeApi({
		path: `/stream-groups/${groupId}/stream-targets`
	});

	const shouldGetNewToken = streamTargets.some(shouldRefreshFacebookToken);

	if (shouldGetNewToken) {
		const token = await facebookLiveLogin()(dispatch);
		await updateTargetsWithNewToken(streamTargets, token);
		return token;
	} else {
		return null;
	}
};

export const createBroadcast = broadcast => async (dispatch, getState) => {
	dispatch(createBroadcastRequest());
  console.log("ValidatingTokenHealth");
	await validateTokenHealth(dispatch, getState(), broadcast.streamGroupId);
  console.log("ValidatingTokenHealthDone");
	let newBroadcast;
	try {
		newBroadcast = await invokeApi({
			path: '/broadcasts',
			method: 'POST',
			body: broadcast,
		});
		dispatch(createBroadcastSuccess(newBroadcast));
		dispatch(closeModal());
		dispatch(push('/live'));
	} catch (error) {
		console.error(error);
		dispatch(createBroadcastFail(error));
    // TODO: remove these
    dispatch(closeModal());
    dispatch(push('live'));
	}

	return newBroadcast;
};

export const deleteBroadcast = broadcastId => async dispatch => {
	dispatch(deleteBroadcastRequest());
	try {
		await invokeApi({
			path: `/broadcasts/${broadcastId}`,
			method: 'DELETE',
		});
		dispatch(deleteBroadcastSuccess(broadcastId));
	} catch (error) {
		console.error(error);
		dispatch(deleteBroadcastFail(error));
	}
};