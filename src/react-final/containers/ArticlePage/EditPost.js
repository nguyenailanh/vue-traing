/**
 *
 * ArticlesPages
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectArticlePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  UPDATE_ARTICLE_REQUEST
} from './constants'

import {
  makeSelectCurrentUser
} from 'containers/App/selectors';

export class EditPost extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor () {
    super()

    this.state = {
      slug: '',
      title: '',
      description: '',
      body: '',
      tagList: '',
      token: ''
    }

    this.updateState = this.updateState.bind(this)
  }

  componentDidMount () {
    if (this.props.currUser) {
      this.setState({
        token: this.props.currUser.token
      })
    }
  }

  updateState (evt) {
    this.setState({
      [evt.target.name]:  evt.target.value
    })
  }

  render() {
    const {
      publishNewPost
    } = this.props
    return (
      <div>
        <Helmet>
          <title>Edit/Publish Article </title>
          <meta name="description" content="Description of Article" />
        </Helmet>
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={publishNewPost(this.state)}>
                <fieldset>
                  <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Article Title"
                        name="title"
                        onChange={this.updateState}
                      />
                  </fieldset>
                  <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="What's this article about?"
                        name="description"
                        onChange={this.updateState}
                      />
                  </fieldset>
                  <fieldset className="form-group">
                      <textarea
                        className="form-control"
                        rows="8"
                        placeholder="Write your article (in markdown)"
                        name="body"
                        onChange={this.updateState}
                      >
                      </textarea>
                  </fieldset>
                  <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter tags - seperated by comma"
                        name="tagList"
                        onChange={this.updateState}
                      />
                      <div className="tag-list"></div>
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="submit">
                      Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    publishNewPost: (articleData) => (evt) => {
      evt.preventDefault()

      dispatch({
        type: UPDATE_ARTICLE_REQUEST,
        payload: {
          articleData: articleData
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
)(EditPost);
