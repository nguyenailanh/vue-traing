import { createSelector } from 'reselect';

const selectHome = (state) => state.get('homePage');


const makeSelectListTag = () => createSelector(
  selectHome,
  (homeState) => homeState.get('tagList')
);

const makeSelectListArticle = () => createSelector(
  selectHome,
  (homeState) => homeState.get('articleList')
);

const makeSelectArticlesCount = () => createSelector(
  selectHome,
  (homeState) => homeState.get('articlesCount')
);

const makeSelectCurrentPage = () => createSelector(
  selectHome,
  (homeState) => homeState.get('currPage')
);

export {
  selectHome,
  makeSelectListTag,
  makeSelectListArticle,
  makeSelectArticlesCount,
  makeSelectCurrentPage
};
