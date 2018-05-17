/*
 *
 * AuthenPage reducer
 *
 */
import { fromJS } from 'immutable';

import {
  GET_TAGS_SUCCESS,
  GET_ARTICLES_SUCCESS,
  TOGGLE_FAVORITE_SUCCESS
} from './constants'
import { withTheme } from 'styled-components';

const initialState = fromJS({
  tagList: [],
  articleList: [],
  articlesCount: 0,
  currPage: 0
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TAGS_SUCCESS:
      return state
        .set('tagList', action.tags)
    case GET_ARTICLES_SUCCESS:
      return state
        .set('articleList', action.articles)
        .set('articlesCount', action.articlesCount)
        .set('currPage', action.currPage)
    case TOGGLE_FAVORITE_SUCCESS:
      const udpatedArticle = action.article
      const newArticles = state.get('articleList').map(article => {
        if(article.slug === udpatedArticle.slug) {
          return {
            ...article,
            favorited: udpatedArticle.favorited,
            favoritesCount: udpatedArticle.favoritesCount
          }
        }

        return article
      })

      return state
        .set('articleList', newArticles)
    default:
      return state;
  }
}

export default homePageReducer;
