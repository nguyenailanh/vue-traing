import { createSelector } from 'reselect';

/**
 * Direct selector to the articlesPages state domain
 */
const selectArticlePageDomain = (state) => state.get('articlePage');

/**
 * Default selector used by ArticlesPages
 */

const makeSelectArticlePage = () => createSelector(
  selectArticlePageDomain,
  (substate) => {
    return substate.get('article')
  }
);

const makeSelectArticleComments = () => createSelector(
  selectArticlePageDomain,
  (substate) => {
    return substate.get('comments')
  }
);

export {
  selectArticlePageDomain,
  makeSelectArticlePage,
  makeSelectArticleComments
};
