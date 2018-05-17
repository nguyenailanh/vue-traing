/**
 *
 * Signup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import saga from './saga';
import messages from './messages';

import Signup from '../../components/AuthenPages/Signup'
import {
  makeSelectAppLoading,
  makeSelectCurrentUser
} from 'containers/App/selectors';

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  FORM_CHANGE_VALUE
} from './constants'

// Signup.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };
const mapState = createStructuredSelector({
  loading: makeSelectAppLoading(),
  loggedUser: makeSelectCurrentUser()
});

function mapActions(dispatch) {
  return {
    onSubmitHandler: ({username, email, password}) => evt => {
      evt.preventDefault()

      dispatch({
        type: SIGNUP_REQUEST,
        payload: {
          username: username,
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

const withReducer = injectReducer({ key: 'authenPage', reducer });
const withSaga = injectSaga({ key: 'authenPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Signup);
