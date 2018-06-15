import streamGroupReducer, { defaultState } from 'reducers/stream-groups';
import {
  fetchStreamGroupsRequest,
  fetchStreamGroupsSuccess,
  fetchStreamGroupRequest,
  fetchStreamGroupSuccess,
  createStreamGroupRequest,
  createStreamGroupSuccess,
  deleteStreamGroupSuccess,
} from 'actions/stream-groups/types';

const createStreamGroups = streamGroups => ([
  { name: 'group 1' },
  { name: 'group 2' },
  { name: 'group 3' },
  ...streamGroups
]);

const createState = state => ({
  ...defaultState,
  ...state
});


describe('Actions: stream-groups', () => {
  describe('fetchStreamGroups()', () => {
    test('request', () => {
      const actual = streamGroupReducer(undefined, fetchStreamGroupsRequest());
      const expected = createState({
        isLoading: true
      });
      expect(actual).toEqual(expected);
    });

    test('success', () => {
      const state = createState({ isLoading: true });
      const streamGroups = [
        { name: 'group 1' },
        { name: 'group 2' },
        { name: 'group 3' }
      ];

      const actual = streamGroupReducer(state, fetchStreamGroupsSuccess(streamGroups));
      const expected = {
        ...state,
        streamGroups,
        isLoading: false
      };

      expect(actual).toEqual(expected)
    });
  });


  describe('createStreamGroup(streamGroup)', () => {
    test('request', () => {
      const actual = streamGroupReducer(undefined, createStreamGroupRequest());
      const expected = createState({
        isSaving: true
      });
      expect(actual).toEqual(expected);
    });

    test('success', () => {
      const state = createState({ isLoading: true });
      const streamGroup = {
        name: 'stream group test'
      };

      const actual = streamGroupReducer(state, createStreamGroupSuccess(streamGroup));

      const expected = {
        ...state,
        streamGroups: state.streamGroups.concat(streamGroup),
        isSaving: false
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('deleteStreamGroup(streamGroupId)', () => {
    test('success', () => {
      const state = createState({
        isDeleting: true,
        streamGroups: [
          { name: 'Keep this group', streamGroupId: 'keepThisId1' },
          { name: 'Delete this group', streamGroupId: 'streamGroupIdToDelete' },
          { name: 'Keep this group', streamGroupId: 'keepThisId2' }
        ]
      });

      const actual = streamGroupReducer(state, deleteStreamGroupSuccess('streamGroupIdToDelete'));

      const expected = {
        ...state,
        streamGroups: [
          { name: 'Keep this group', streamGroupId: 'keepThisId1' },
          { name: 'Keep this group', streamGroupId: 'keepThisId2' }
        ],
        isDeleting: false
      };

      expect(actual).toEqual(expected);
    });
  });
});
