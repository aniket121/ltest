import {
	FETCH_BROADCASTS_REQUEST,
	FETCH_BROADCASTS_SUCCESS,
	FETCH_BROADCASTS_FAIL,
	FETCH_BROADCAST_REQUEST,
	FETCH_BROADCAST_SUCCESS,
	FETCH_BROADCAST_FAIL,
	CREATE_BROADCAST_REQUEST,
	CREATE_BROADCAST_SUCCESS,
	CREATE_BROADCAST_FAIL,
	DELETE_BROADCAST_REQUEST,
	DELETE_BROADCAST_SUCCESS,
	DELETE_BROADCAST_FAIL,
} from 'actions/broadcasts/types';
import { LOGOUT_USER } from 'actions/auth/types';
import { RESET_LIVE_STATE } from 'actions/live/types';

export const defaultState = {
	broadcasts: [],
	currentBroadcast: null,
	isLoading: false,
	isSaving: false,
	isDeleting: false,
};

export default (state = defaultState, action) => {
	const { type, payload } = action;
	switch (type) {
		case CREATE_BROADCAST_SUCCESS:
			return {
				...state,
				broadcasts: state.broadcasts.concat(payload.broadcast),
				currentBroadcast: payload.broadcast,
				isSaving: false,
			};
		case DELETE_BROADCAST_SUCCESS:
			const indexToDelete = state.broadcasts.findIndex(
				broadcast => broadcast.broadcastId === payload.broadcastId
			);
			return {
				...state,
				broadcasts: [...state.broadcasts.slice(0, indexToDelete), ...state.broadcasts.slice(indexToDelete + 1)],
				isDeleting: false,
			};
		case RESET_LIVE_STATE:
			return {
				...state,
				currentBroadcast: null,
			};
		case FETCH_BROADCASTS_SUCCESS:
			const broadcasts = payload.broadcasts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
			return {
				...state,
				broadcasts,
				isLoading: false,
			};
		case FETCH_BROADCAST_SUCCESS:
		case FETCH_BROADCASTS_REQUEST:
		case FETCH_BROADCASTS_FAIL:
		case FETCH_BROADCAST_REQUEST:
		case FETCH_BROADCAST_FAIL:
		case CREATE_BROADCAST_REQUEST:
		case CREATE_BROADCAST_FAIL:
		case DELETE_BROADCAST_REQUEST:
		case DELETE_BROADCAST_FAIL:
			return {
				...state,
				...payload,
			};
		case LOGOUT_USER:
			return defaultState;
		default:
			return state;
	}
};
