/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  PROFILE_GET_PROFILE_SUCCESS,
  PROFILE_TOGGLE_FOLLOW_USER_SUCCESS
} from './constants';

const initialState = fromJS({
  userProfile: {},
  articleList: [],
  articlesCount: 0,
  currPage: 0
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case PROFILE_GET_PROFILE_SUCCESS:
    case PROFILE_TOGGLE_FOLLOW_USER_SUCCESS:
      return state
        .set('userProfile', action.payload.userProfile)
    default:
      return state;
  }
}

export default profilePageReducer;
