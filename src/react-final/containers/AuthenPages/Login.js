/**
 *
 * Login
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import globalReducer from '../App/reducer'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

import Login from '../../components/AuthenPages/Login'
import {
  makeSelectAppLoading,
  makeSelectCurrentUser
} from 'containers/App/selectors';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORM_CHANGE_VALUE
} from './constants'

const mapState = createStructuredSelector({
   loading: makeSelectAppLoading(),
   loggedUser: makeSelectCurrentUser()
});

function mapActions(dispatch) {
  return {
    onSubmitHandler: ({email, password}) => evt => {
      evt.preventDefault()

      dispatch({
        type: LOGIN_REQUEST,
        payload: {
          email: email,
          password: password
        }
      })
    }
  };
}

const withConnect = connect(
  mapState,
  mapActions
);

const withReducer = injectReducer(
  {
   key: 'authenPage',
   reducer
  }
);
const withSaga = injectSaga(
  {
    key: 'authenPage',
    saga
  }
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
