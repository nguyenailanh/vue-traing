/*
 *
 * ArticlesPages reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ARTICLE_SUCCESS,
  GET_COMMENTS_ARTICLE_SUCCESS
} from './constants';

const initialState = fromJS({
  article: {},
  comments: []
});

function articlesPagesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLE_SUCCESS:
      return state.
        set('article', action.article)
    case GET_COMMENTS_ARTICLE_SUCCESS:
      return state.
        set('comments', action.comments)
    default:
      return state;
  }
}

export default articlesPagesReducer;
