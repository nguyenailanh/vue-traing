/**
 *
 * Setting
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import {connect} from 'react-redux'
import {
  makeSelectCurrentUser,
  makeSelectAppLoading
} from 'containers/App/selectors';

import reducer from './reducer';
import saga from './saga';

import {
  SETTING_UPDATE
} from './constants'

class Setting extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor () {
    super()
    this.state = {
      email: '',
      username: '',
      image: '',
      bio: '',
      password: '',
      token: '',
      submiting: false
    }

    this.updateState = this.updateState.bind(this)
  }

  updateState (evt) {
    this.setState({
      [evt.target.name]:  evt.target.value
    })
  }

  componentDidMount () {
    const { loggedUser, history } = this.props
    if (!loggedUser.username) {
      history.replace('/login')
    }
    Object.keys(loggedUser).map(key => {
      if(this.state.hasOwnProperty(key) && loggedUser[key]) {
        this.setState({
          [key]: loggedUser[key]
        })
      }
    })
  }

  render() {
    const {
      loading,
      onSubmitHandler
    } = this.props
    return (
      <div>
        <Helmet>
          <title>Setting</title>
          <meta name="description" content="Description of Setting" />
        </Helmet>
        <div
          className="settings-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Update Your Settings</h1>
                <form
                  onSubmit={onSubmitHandler(this.state)}>
                  <fieldset>
                      <fieldset className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="URL of profile picture"
                          name="image"
                          value={this.state.image}
                          onChange={this.updateState}
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="User Name"
                          name="username"
                          required
                          value={this.state.username}
                          onChange={this.updateState}
                        />
                      </fieldset>
                      <fieldset
                        className="form-group">
                        <textarea
                          className="form-control form-control-lg"
                          rows="5"
                          placeholder="Short bio about you"
                          name="bio"
                          value={this.state.bio}
                          onChange={this.updateState}
                        >
                        </textarea>
                      </fieldset>
                      <fieldset
                        className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Email"
                          name="email"
                          required
                          value={this.state.email}
                          onChange={this.updateState}
                        />
                      </fieldset>
                      <fieldset
                        className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          placeholder="Password"
                          name="password"
                          required
                          onChange={this.updateState}
                        />
                      </fieldset>
                      <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        disabled={loading}
                      >
                        Update Settings
                      </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = createStructuredSelector({
  loading: makeSelectAppLoading(),
  loggedUser: makeSelectCurrentUser()
});

function mapActions(dispatch) {
  return {
    changeValue: (evt) => {
      dispatch({
        type: FORM_CHANGE_VALUE,
        payload: {
          key: evt.target.name,
          value: evt.target.value
        }
      })
    },

    onSubmitHandler: (userData) => evt => {
      evt.preventDefault()

      dispatch({
        type: SETTING_UPDATE,
        payload: userData
      })
    }
  };
}
const withReducer = injectReducer({ key: 'authenPage', reducer });
const withSaga = injectSaga({ key: 'authenPage', saga });

const withConnect = connect(
  mapState,
  mapActions
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Setting);
