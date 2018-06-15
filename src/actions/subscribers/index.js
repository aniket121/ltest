import { invokeApi } from 'libs/aws';
import {
  fetchSubscribersRequest,
  fetchSubscribersSuccess,
  fetchSubscribersFail,
  grantBetaRequest,
  grantBetaSuccess,
  grantBetaFail,
  deleteSubscriberRequest,
  deleteSubscriberSuccess,
  deleteSubscriberFail
} from './types';

export const fetchSubscribers = () => async dispatch => {
  dispatch(fetchSubscribersRequest());

  try {
    const subscribers = await invokeApi({
      path: `/subscribers`
    });
    dispatch(fetchSubscribersSuccess(subscribers));
  } catch (error) {
    console.error(error);
    dispatch(fetchSubscribersFail({ message: 'Error fetching subscribers' }));
  }
};

export const grantBeta = (subscriberId, beta) => async dispatch => {
  dispatch(grantBetaRequest());

  try {
    const subscriber = await invokeApi({
      path: `/subscribers/${subscriberId}`,
      method: 'put',
      body: {
        beta
      }
    });
    dispatch(grantBetaSuccess(subscriber));
  } catch (error) {
    console.error(error);
    dispatch(grantBetaFail({ message: 'Error granting beta access' }));
  }
};

export const deleteSubscriber = subscriberId => async dispatch => {
  dispatch(deleteSubscriberRequest());

  try {
    await invokeApi({
      path: `/subscribers/${subscriberId}`,
      method: 'delete'
    });
    dispatch(deleteSubscriberSuccess(subscriberId));
  } catch (error) {
    console.error(error);
    dispatch(deleteSubscriberFail({ message: 'Error deleting subscriber' }));
  }
};
