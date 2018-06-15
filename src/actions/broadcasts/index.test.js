import {
  fetchBroadcastSuccess,
  fetchBroadcastsSuccess,
  createBroadcastRequest,
  createBroadcastSuccess,
  deleteBroadcastSuccess
} from 'actions/broadcasts/types';
import { 
  validateTokenHealth,
  shouldRefreshFacebookToken,
  updateTargetsWithNewToken
} from 'actions/broadcasts';
import broadcastReducer, { defaultState } from 'reducers/broadcasts';

const createState = state => ({
  ...defaultState,
  ...state
});

describe('Actions: broadcasts', () => {
  describe('fetchBroadcasts()', () => {
    test('success', () => {
      const state = createState({ isLoading: true });
      const broadcasts = [
        { title: 'broadcast 1' },
        { title: 'broadcast 2' },
        { title: 'broadcast 3' }
      ];

      const actual = broadcastReducer(
        state,
        fetchBroadcastsSuccess(broadcasts)
      );
      const expected = {
        ...state,
        broadcasts,
        isLoading: false
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('createBroadcast(broadcast)', () => {
    test('request', () => {
      const actual = broadcastReducer(undefined, createBroadcastRequest());
      const expected = createState({
        isSaving: true
      });
      expect(actual).toEqual(expected);
    });

    test('success', () => {
      const state = createState({ isLoading: true });
      const broadcast = {
        name: 'broadcast test'
      };

      const actual = broadcastReducer(state, createBroadcastSuccess(broadcast));

      const expected = {
        ...state,
        currentBroadcast: broadcast,
        broadcasts: state.broadcasts.concat(broadcast),
        isSaving: false
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('deleteBroadcast(broadcastId)', () => {
    test('success', () => {
      const state = createState({
        isDeleting: true,
        broadcasts: [
          { title: 'Keep this broadcast', broadcastId: 'keepThisId1' },
          {
            title: 'Delete this broadcast',
            broadcastId: 'broadcastIdToDelete'
          },
          { title: 'Keep this broadcast', broadcastId: 'keepThisId2' }
        ]
      });

      const actual = broadcastReducer(
        state,
        deleteBroadcastSuccess('broadcastIdToDelete')
      );

      const expected = {
        ...state,
        broadcasts: [
          { title: 'Keep this broadcast', broadcastId: 'keepThisId1' },
          { title: 'Keep this broadcast', broadcastId: 'keepThisId2' }
        ],
        isDeleting: false
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('should refresh facebook token', () => {
    test('for very old token', () => {
      const streamTarget = {
        createdAt: '2016-09-14T02:56:33.875Z'
      };
      const actual = shouldRefreshFacebookToken(streamTarget);
      expect(actual).toBeTruthy();
    });

    test('for 60-day old token', () => {
      const streamTarget = {
        createdAt: '2017-07-16T02:56:33.875Z'
      };
      const actual = shouldRefreshFacebookToken(streamTarget);
      expect(actual).toBeTruthy();
    });

    test('for young token', () => {
      const streamTarget = {
        createdAt: '2017-09-01T02:56:33.875Z'
      };
      const actual = shouldRefreshFacebookToken(streamTarget);
      expect(actual).toBeFalsy();
    });
  });

  describe('validate token health', () => {
    test('when one group must be refreshed', async () => {
      const state = {
        streamTargets: {
          streamTargets: [
            {
              streamGroupId: 'group-1',
              createdAt: '2017-07-16T02:56:33.875Z'
            },
            {
              streamGroupId: 'group-1',
              createdAt: '2017-09-01T02:56:33.875Z'
            },
            {
              streamGroupId: 'group-1',
              createdAt: '2017-08-01T02:56:33.875Z'
            },
          ]
        }
      }
      const token = await validateTokenHealth(state, 'group-1')
      console.log(token)
      expect(token).not.toBeNull();
    });
  });

  describe('update targets with new token', () => {
    test('invokes update for each stream target', () => {
      const streamTargets = [
        { token: { content: { access_token: 'regulartoken1' }}}, 
        { token: { content: { access_token: 'regulartoken2' }}}
      ];
      const token = { 
        provider: 'facebook', 
        content: {
          accessToken: 'supertoken',
          expiresIn: 3600
        }
      };

      updateTargetsWithNewToken(streamTargets, token)
    });
  });
});
