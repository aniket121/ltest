import {
  fetchStreamTargetsRequest,
  fetchStreamTargetsSuccess,
  createStreamTargetSuccess,
  createStreamTargetFail,
  deleteStreamTargetSuccess
} from 'actions/stream-targets/types';

import streamTargetReducer, { defaultState } from 'reducers/stream-targets';

describe('Actions: stream-targets', () => {
  describe('fetchStreamTargets()', () => {
    test('request', () => {
      const actual = streamTargetReducer(undefined, fetchStreamTargetsRequest())
      const expected = {
        ...defaultState,
        isLoading: true
      };
      expect(actual).toEqual(expected);
    });

    test('success', () => {
      const actual = streamTargetReducer(undefined, fetchStreamTargetsRequest())
      const expected = {
        ...defaultState,
        isLoading: true
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('createStreamTarget(streamTarget)', () => {
    test('success', () => {
      const streamTarget = {
        name: 'A Test Target',
        streamGroupId: 'id-1',
        provider: 'twitter',
        privacy: 'public'
      };
      const actual = streamTargetReducer(undefined, createStreamTargetSuccess(streamTarget))
      const expected = {
        ...defaultState,
        streamTargets: defaultState.streamTargets.concat(streamTarget)
      };
      expect(actual).toEqual(expected);
    });

    test('fail', () => {
      const state = {
        ...defaultState,
        isSaving: true,
        error: {}
      };

      const actual = streamTargetReducer(state, createStreamTargetFail({ message: 'Failed to create target'}))
      const expected = {
        ...defaultState,
        isSaving: false,
        error: { message: 'Failed to create target' }
      };
      expect(actual).toEqual(expected);
    });
  });
  describe('deleteStreamTarget', () => {
    test('success', () => {
      const streamTargets = [
        {
          name: 'A Test Target',
          streamGroupId: 'id-1',
          provider: 'twitter',
          privacy: 'public'
        },
        {
          name: 'Another Test Target',
          streamGroupId: 'id-2',
          provider: 'dailymotion',
          privacy: 'public'
        },
        {
          name: 'Other Test Target',
          streamGroupId: 'id-3',
          provider: 'linkedin',
          privacy: 'public'
        },
      ];

      const state = {
        ...defaultState,
        streamTargets
      };

      const actual = streamTargetReducer(state, deleteStreamTargetSuccess(streamTargets[1].streamGroupId))

      const indexToDelete = streamTargets.findIndex(t => t.streamTargetId === streamTargets[1].streamGroupId);

      const expected = {
        ...defaultState,
        streamTargets: [
          ...streamTargets.slice(0, indexToDelete),
          ...streamTargets.slice(indexToDelete + 1)
        ]
      };
      expect(actual).toEqual(expected);
    });
  });
});
