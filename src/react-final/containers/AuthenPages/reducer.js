/*
 *
 * AuthenPage reducer
 *
 */
import { fromJS } from 'immutable';

import {
  SETTING_UPDATE,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  SETTING_UPDATE_SUCCESS,
} from './constants'

const initialState = fromJS({
  loggedUser: {}
});

function authenPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case SETTING_UPDATE_SUCCESS:
      return state
        .set('loggedUser', action.loggedUser)
    case 'LOGOUT_REQUEST':
      return state
        .set('loggedUser', {})
    default:
      return state;
  }
}

export default authenPageReducer;
