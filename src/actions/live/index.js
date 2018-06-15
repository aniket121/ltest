import request from 'request';
import get from 'lodash/get';
import { invokeApi } from 'libs/aws';
import config from 'config';
import {
  enableGoLive,
  toggleLocalVideo,
  toggleLocalAudio,
  toggleChat,
  startCountdown,
  tickCountdown,
  transitionBroadcastRequest,
  transitionBroadcastSuccess,
  transitionBroadcastFail,
  joinChannel,
  leaveChannel,
  fetchCommentsRequest,
  fetchCommentsSuccess,
  endBroadcast,
  resetLiveState,
  setPollIntervalId,
  clearPollIntervalId,
  setViewers,
} from 'actions/live/types';

export const transitionBroadcast = status => async (dispatch, getState) => {
  dispatch(transitionBroadcastRequest());

  const { currentBroadcast } = getState().broadcasts;

  try {
    await invokeApi({
      path: `/broadcasts/${currentBroadcast.broadcastId}/transition`,
      method: 'PUT',
      body: {
        status
      }
    });
    dispatch(transitionBroadcastSuccess(status))
  } catch(error) {
    console.error(error);
    dispatch(transitionBroadcastFail(error))
  }
};

const fetchFacebookData = ({ liveVideoId, token }) => {
  const options = {
    url: `${config.GRAPH_API}/${liveVideoId}?` +
         `access_token=${token.content.access_token}&` + 
         `fields=comments{from{name,picture},created_time,message},live_views`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  return new Promise((resolve, reject) => {
    request.get(options, async (err, response, body) => {
      if (err) {
        return reject(err);
      }

      resolve(JSON.parse(body));
    });
  });
}

const fetchYoutubeData = ({ liveChatId, token }) => {
  const options = {
    url: `https://www.googleapis.com/youtube/v3/liveChat/messages?` +
         `access_token=${token.content.access_token}&` +
         `liveChatId=${liveChatId}&` +
         `part=id,authorDetails,snippet`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  return new Promise((resolve, reject) => {
    request.get(options, async (err, response, body) => {
      if (err) {
        return reject(err);
      }

      resolve(JSON.parse(body));
    });
  });
}

const formatFacebookComments = comments => {
  return comments.map(comment => ({
    id: comment.id,
    provider: 'facebook',
    message: comment.message,
    name: get(comment, 'from.name'),
    picture: get(comment, 'from.picture.data.url'),
    createdAt: comment.created_time
  }));
};

const formatYoutubeComments = comments => {
  return comments.map(comment => ({
    id: comment.id,
    provider: 'youtube',
    message: get(comment, 'snippet.textMessageDetails.messageText'),
    name: get(comment, 'authorDetails.displayName'),
    picture: get(comment, 'authorDetails.profileImageUrl'),
    createdAt: get(comment, 'snippet.publishedAt')
  }));
};

export const fetchComments = () => async (dispatch, getState) => {
  dispatch(fetchCommentsRequest());

  const { currentBroadcast } = getState().broadcasts;

  const youtubeTargets = currentBroadcast.streamTargetContainers
    .filter(container => container.streamTarget.provider === 'youtube')
    .map((container, i) => ({
      source: `youtube_channel_${i}`,
      liveChatId: get(container, 'providerConfig.youtubeBroadcast.liveChatId'),
      token: container.streamTarget.token
    }))

  const facebookTargets = currentBroadcast.streamTargetContainers
    .filter(container => container.streamTarget.provider === 'facebook')
    .map((container, i) => ({
      source: `facebook_${get(container, 'streamTarget.config.destType')}_${i}`,
      liveVideoId: container.providerConfig.facebookLiveVideo.id,
      token: container.streamTarget.token
    }));

  const pollIntervalId = setInterval(() => {
    youtubeTargets.forEach(ytTarget => {
      fetchYoutubeData(ytTarget)
        .then(results => {
          const viewSource = { 
            source: ytTarget.source,
            count: 0  // TODO: replace with actual youtube data
          };
          dispatch(setViewers(viewSource))
          return results.items
        })
        .then(formatYoutubeComments)
        .then(formattedComments => dispatch(fetchCommentsSuccess(formattedComments)))
        .catch(err => {})
    });

    facebookTargets.forEach(fbTarget => {
      fetchFacebookData(fbTarget)
        .then(results => {
          const viewSource = { 
            source: fbTarget.source,
            count: results.live_views
          };
          dispatch(setViewers(viewSource))
          return results.comments.data
        })
        .then(formatFacebookComments)
        .then(formattedComments => dispatch(fetchCommentsSuccess(formattedComments)))
        .catch(err => {})
    });
  }, config.POLL_INTERVAL)

  dispatch(setPollIntervalId(pollIntervalId));
};

export const clearPollInterval = () => (dispatch, getState) => {
  clearInterval(getState().live.pollIntervalId)
  dispatch(clearPollIntervalId())
}

export {
  toggleChat,
  toggleLocalVideo,
  toggleLocalAudio,
  startCountdown,
  tickCountdown,
  joinChannel,
  leaveChannel,
  enableGoLive,
  endBroadcast,
  resetLiveState,
};
