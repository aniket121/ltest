import { push } from 'react-router-redux';
import { invokeApi } from 'libs/aws';
import {
  fetchStreamGroupsRequest,
  fetchRtmpRequest,
  fetchRtmpSuccess,
  fetchRtmpError,
  fetchStreamGroupsSuccess,
  fetchStreamGroupsFail,
  fetchStreamGroupRequest,
  fetchStreamGroupSuccess,
  fetchStreamGroupFail,
  createStreamGroupRequest,
  createStreamGroupSuccess,
  createStreamGroupFail,
  deleteStreamGroupRequest,
  deleteStreamGroupSuccess,
  deleteStreamGroupFail,
} from 'actions/stream-groups/types';
import {
  closeModal
} from 'actions/app/types';

/**************************************************
* Dispatch callers
**************************************************/

export const fetchStreamGroups = () => async dispatch => {
 console.log("fetch group API called")
  dispatch(fetchStreamGroupsRequest());
  try {
    const streamGroups = await invokeApi({ path: '/stream-groups' });
    dispatch(fetchStreamGroupsSuccess(streamGroups))
  } catch(error) {
    console.error(error);
    dispatch(fetchStreamGroupsFail('Error fetching stream groups'));
  }
}

export const enableRtmp = streamGroup=> async dispatch => {

   console.log(" RTMP API called")
  dispatch(fetchRtmpRequest());
  try {

    streamGroup['isRtmpEnabled'] = !streamGroup['isRtmpEnabled']
    const streamGroups = await invokeApi({
      path: `/stream-groups/${streamGroup.streamGroupId}/ingestion`,
      method: 'PUT',
      body: streamGroup
    });
    dispatch(fetchRtmpSuccess(streamGroups))
  } catch(error) {
    console.error(error);
    dispatch(fetchRtmpError('Error fetching RTMP'));
  }
}

export const fetchStreamGroup = streamGroupId => async dispatch => {
  dispatch(fetchStreamGroupRequest());
  try {
    const streamGroup = await invokeApi({ path: `/stream-groups/${streamGroupId}` });
    dispatch(fetchStreamGroupSuccess(streamGroup))

  } catch(error) {
    console.error(error);
    dispatch(fetchStreamGroupFail(`Error fetching stream group ${streamGroupId}`));
  }
}

export const setStreamGroup = streamGroupId => (dispatch, getState) => {
  const { streamGroups } = getState().streamGroups;
  if (streamGroups && streamGroups.length) {
    const streamGroup = getState().streamGroups.streamGroups.find(
      group => group.streamGroupId === streamGroupId
    );
    dispatch(fetchStreamGroupSuccess(streamGroup));
  } else {
    fetchStreamGroup(streamGroupId)(dispatch);
  }
}

export const createStreamGroup = streamGroup => async dispatch => {
  dispatch(createStreamGroupRequest());
  try {
    const newStreamGroup = await invokeApi({
      path: '/stream-groups',
      method: 'POST',
      body: streamGroup
    });
    dispatch(createStreamGroupSuccess(newStreamGroup));
    dispatch(closeModal());
    dispatch(push(`/destinations/${newStreamGroup.streamGroupId}`));
  } catch (error) {
    console.error(error)
    dispatch(createStreamGroupFail(error));
  }
}

export const deleteStreamGroup = streamGroupId => async dispatch => {
  dispatch(deleteStreamGroupRequest());
  try {
    const results = await invokeApi({ path: `/stream-groups/${streamGroupId}`, method: 'DELETE' });
    dispatch(deleteStreamGroupSuccess(streamGroupId));
  } catch (error) {
    console.error(error);
    dispatch(deleteStreamGroupFail(error));
  }
}
