import {
  setViewers,
  enableGoLive,
  toggleLocalVideo,
  toggleLocalAudio,
  startCountdown,
  tickCountdown,
  transitionBroadcastRequest,
  transitionBroadcastSuccess,
  transitionBroadcastFail,
  joinChannel,
  leaveChannel
} from 'actions/live/types';
import liveReducer, { defaultState } from 'reducers/live';

const createState = settings => ({
  ...defaultState,
  ...settings
});

describe('Actions: live', () => {
  describe('transitionBroadcast()', () => {
    test('request', () => {
      const actual = liveReducer(undefined, transitionBroadcastRequest())
      const expected = {
        ...defaultState,
        isLoading: true
      };
      expect(actual).toEqual(expected);
    });

    test('success', () => {
      const state = createState({
        isLoading: true
      });
      const status = 'publishing';
      const actual = liveReducer(state, transitionBroadcastSuccess(status));
      const expected = {
        ...defaultState,
        status: 'publishing',
        isLoading: false
      };
      expect(actual).toEqual(expected);
    });

    test('fail', () => {
      const state = createState({
        isLoading: true,
        error: ''
      });
      const error = 'Some error occurred';
      const actual = liveReducer(state, transitionBroadcastFail(error));
      const expected = {
        ...defaultState,
        error: 'Some error occurred',
        isLoading: false
      };
      expect(actual).toEqual(expected);
    });
  });

  test('toggleLocalAudio()', () => {
    const actual = liveReducer(undefined, toggleLocalAudio())
    const expected = {
      ...defaultState,
      localAudioEnabled: false
    };
    expect(actual).toEqual(expected);
  });

  test('toggleLocalVideo()', () => {
    const actual = liveReducer(undefined, toggleLocalVideo())
    const expected = {
      ...defaultState,
      localVideoEnabled: false
    };
    expect(actual).toEqual(expected);
  });

  test('startCountdown()', () => {
    const actual = liveReducer(undefined, startCountdown())
    const expected = {
      ...defaultState,
      showCountdown: true,
      countdown: 3,
      isLoading: true
    };
    expect(actual).toEqual(expected);
  });

  test('tickCountdown()', () => {
    const state = createState({
      showCountdown: true,
      countdown: 3
    });

    const actual = liveReducer(state, tickCountdown())
    const expected = {
      ...defaultState,
      showCountdown: true,
      countdown: 2
    };
    expect(actual).toEqual(expected);

    const actual2 = liveReducer(expected, tickCountdown())
    const expected2 = {
      ...defaultState,
      showCountdown: true,
      countdown: 1
    };
    expect(actual2).toEqual(expected2);
  });

  test('setViewers', () => {
    const viewerSource = { source: 'facebook_timeline', count: 1337 };

    const actual = liveReducer(undefined, setViewers(viewerSource));
    const expected = {
      ...defaultState,
      viewers: {
        'facebook_timeline': 1337
      }
    };
    expect(actual).toEqual(expected);
  })

  test('setViewers with multiple sources', () => {
    const viewerSourceTimeline = { source: 'facebook_timeline', count: 1337 };
    const viewerSourcePage = { source: 'facebook_page', count: 6969 };
    const viewerSourceYT = { source: 'youtube_channel', count: 805 };
    
    const prepreactual = liveReducer(undefined, setViewers(viewerSourceTimeline));
    const preactual = liveReducer(prepreactual, setViewers(viewerSourcePage));
    const actual = liveReducer(preactual, setViewers(viewerSourceYT));
    
    const expected = {
      ...defaultState,
      viewers: {
        'facebook_timeline': 1337,
        'facebook_page': 6969,
        'youtube_channel': 805
      }
    };
    expect(actual).toEqual(expected);
  })
})
