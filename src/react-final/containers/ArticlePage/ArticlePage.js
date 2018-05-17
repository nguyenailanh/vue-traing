/**
 *
 * ArticlePage
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
import reducer from './reducer';
import saga from './saga';

import Banner from 'components/Article/Banner'
import CommentList from 'components/Article/CommentList'
import Content from 'components/Article/Content'
import Actions from 'components/Article/Actions'
import AddComment from 'components/Article/AddComment'
import {
  makeSelectCurrentUser
} from 'containers/App/selectors';

import {
  makeSelectArticlePage,
  makeSelectArticleComments
} from './selectors';

import { Link } from 'react-router-dom';

import {
  GET_ARTICLE_REQUEST
} from './constants'

export class ArticlePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount () {
    this.getArticle()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getArticle()
    }
  }

  getArticle () {
    const {
      match,
      getArticleBySlug,
      currUser
    } = this.props

    getArticleBySlug(match.params.slug, currUser.token)
  }

  render() {
    const {
      article,
      currUser,
      comments
    } = this.props
    
    return (
      <div>
        <Helmet>
          <title>ArticlePage</title>
          <meta name="description" content="Description of ArticlePage" />
        </Helmet>

        <div className="article-page">
          <Banner
            article={article}
            currUser={currUser}
          />
          <div className="container page">
            <Content
              article={article}
            />
            <Actions
              article={article}
              currUser={currUser}
            />
            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                {
                  (currUser.username)
                  ? (<AddComment
                        slug={article.slug}
                        currUser={currUser}
                    />
                  )
                  : (<p>
                      <Link
                        to="/login"
                      >
                      Login &nbsp;
                      </Link>
                      or  &nbsp;
                      <Link
                        to="/signup"
                      >
                       Signup &nbsp;
                      </Link>
                      to add comment this post
                    </p>)
                }
               
                <CommentList
                  comments={comments}
                  slug={article.slug}
                />
              </div>
            </div>
           </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currUser: makeSelectCurrentUser(),
  article: makeSelectArticlePage(),
  comments: makeSelectArticleComments()
});

function mapDispatchToProps(dispatch) {
  return {
    getArticleBySlug: (slug, token) => {
      dispatch({
          type: GET_ARTICLE_REQUEST,
          payload: {
            slug: slug,
            token: token
          }
        })
    }
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'articlePage', reducer });
const withSaga = injectSaga({ key: 'articlePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ArticlePage);
