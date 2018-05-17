import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');
const selectRoute = (state) => state.get('route');
const selectAuthen = (state) => state.get('authen');
const selectHome = (state) => state.get('homePage');

const makeSelectAppLoading = () => createSelector(
  selectGlobal,
  (globalState) => {
   return globalState.get('activeRequests')
  }
);

const makeSelectAppError = () => createSelector(
  selectGlobal,
  (globalState) => {
   return globalState.get('error')
  }
);

const makeSelectCurrentUser = () => createSelector(
  selectAuthen,
  (authenState) => {
    return authenState.get('loggedUser')
  }
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

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

export {
  selectAuthen,
  makeSelectAppLoading,
  makeSelectAppError,
  makeSelectLocation,
  makeSelectCurrentUser,
  makeSelectListTag,
  makeSelectListArticle,
  makeSelectArticlesCount
};
