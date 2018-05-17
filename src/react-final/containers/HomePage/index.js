/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {connect} from 'react-redux'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import { Helmet } from 'react-helmet';
import reducer from './reducer'
import saga from './saga'
import {
  makeSelectListTag,
  makeSelectListArticle,
  makeSelectArticlesCount,
  makeSelectCurrentPage
} from './selectors';

import {
  makeSelectCurrentUser
} from 'containers/App/selectors';

import {
  GET_TAGS_REQUEST,
  GET_ARTICLES_REQUEST,
  TOGGLE_FAVORITE_REQUEST
} from './constants'

import Tags from '../../components/HomePage/Tags'
import Main from '../../components/HomePage/Main'

const navItems = [
  {
    title: 'Your Feed',
    href: 'owner',
    params: {
      author: 'owner'
    }
  },
  {
    title: 'Global Feed',
    href: 'global',
    params: {
      author: ''
    }
  }
]

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount () {
    this.props.getTagList()
  }

  render() {
    const {
      tagList,
      articleList,
      articlesCount,
      currPage,
      currUser,
      getArticleList,
      toggleFavorite,
      location
    } = this.props

    const newNav = navItems.map((item) => {
      if(currUser.username)  {
        if (item.href === 'owner') {
          item.params.author = currUser.username
          return item
        }

        return item
      }

      return item
    })

    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Description of Homepage" />
        </Helmet>
        <div className="home-page">
          <div className="banner">
            <div className="container">
              <h1 className="logo-font">conduit</h1>
              <p>A place to share your knowledge.</p>
            </div>
          </div>
          <div className="container page">
            <div className="row">
              <Main
                navItems={navItems}
                currPage={currPage}
                articleList={articleList}
                articlesCount={articlesCount}
                toggleFavorite={toggleFavorite}
                getArticleList={getArticleList}
                currUser={currUser}
                location={location}
              />
              <Tags
                tagList={tagList}
                currUser={currUser}
                getArticleList={getArticleList}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = createStructuredSelector({
  tagList: makeSelectListTag(),
  articleList: makeSelectListArticle(),
  articlesCount: makeSelectArticlesCount(),
  currPage: makeSelectCurrentPage(),
  currUser: makeSelectCurrentUser()
});

function mapActions(dispatch) {
  return {
    getTagList: () => {
      dispatch({
        type: GET_TAGS_REQUEST
      })
    },

    getArticleList: (token, currPage, params) => {
      dispatch({
        type: GET_ARTICLES_REQUEST,
        payload: {
          params: params,
          token: token,
          currPage: currPage
        },
      })
    },

    toggleFavorite: (token, favorited, slug) => {
      dispatch({
        type: TOGGLE_FAVORITE_REQUEST,
        payload: {
          token: token,
          favorited: favorited,
          slug: slug
        }
      })
    }
  };
}

const withConnect = connect(
  mapState,
  mapActions
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);

