/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import homeReducer from '../HomePage/reducer';
import saga from './saga';
import homeSaga from '../HomePage/saga';
import { Link } from 'react-router-dom';
import UserInfo from 'components/ProfilePage/UserInfo'
import Main from '../../components/HomePage/Main'
import {
  makeSelectCurrentUser
} from 'containers/App/selectors';

import {
  makeSelectListArticle,
  makeSelectArticlesCount,
  makeSelectCurrentPage
} from '../HomePage/selectors';

import {
  makeSelectUserProfile
} from './selectors';

import {
  PROFILE_GET_PROFILE_REQUEST,
  PROFILE_TOGGLE_FOLLOW_USER_REQUEST
} from './constants'

import {
  GET_ARTICLES_REQUEST,
  TOGGLE_FAVORITE_REQUEST
} from '../HomePage/constants'

const navItems = [
  {
    title: 'My Feed',
    href: 'user',
    params: {
      author: 'user'
    }
  },
  {
    title: 'Favorite Feed',
    href: 'favorite',
    params: {
      favorited: ''
    }
  }
]

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount () {
    this.getUserProfile()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.querySelectorAll('.feed-toggle .nav-link.active')
      this.getUserProfile()
    }
  }

  getUserProfile () {
    const {
      match,
      loggedUser,
      getProfile,
    } = this.props

    getProfile(match.params.username, loggedUser.token)
  }

  render() {
    const {
      loggedUser,
      userProfile,
      articleList,
      articlesCount,
      currPage,
      getArticleList,
      toggleFavorite,
      toggleFollowUser,
      location
    } = this.props

    const newNav = navItems.map((item) => {
      if(userProfile.username)  {
        if (item.href === 'user') {
          item.params.author = userProfile.username
          return item
        } else {
          item.params.favorited = userProfile.username
          return item
        }
      }

      return item
    })

    return (
      <div>
        <Helmet>
          <title>ProfilePage</title>
          <meta name="description" content="Description of ProfilePage" />
        </Helmet>
        <div className="profile-page">
          <UserInfo
            loggedUser={loggedUser}
            userProfile={userProfile}
            toggleFollowUser={toggleFollowUser}
          />

          <div className="container">
            <div className="row">

              <div className="col-xs-12 col-md-10 offset-md-1">
                <Main
                  navItems={newNav}
                  currPage={currPage}
                  articleList={articleList}
                  articlesCount={articlesCount}
                  toggleFavorite={toggleFavorite}
                  getArticleList={getArticleList}
                  currUser={loggedUser}
                  userProfile={userProfile}
                  location={location}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ProfilePage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  loggedUser: makeSelectCurrentUser(),
  userProfile: makeSelectUserProfile(),
  articleList: makeSelectListArticle(),
  articlesCount: makeSelectArticlesCount(),
  currPage: makeSelectCurrentPage()
});

function mapDispatchToProps(dispatch) {
  return {
    getProfile: (username, token) => {
      dispatch ({
        type: PROFILE_GET_PROFILE_REQUEST,
        payload: {
          username: username,
          token: token
        }
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
    },

    toggleFollowUser: (token, username, following) => (evt) => {
      evt.preventDefault()

      dispatch({
        type: PROFILE_TOGGLE_FOLLOW_USER_REQUEST,
        payload: {
          token: token,
          username: username,
          following: following
        }
      })
    }

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profilePage', reducer });
const withSaga = injectSaga({ key: 'profilePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProfilePage);
