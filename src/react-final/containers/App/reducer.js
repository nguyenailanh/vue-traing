/*
 *
 * AuthenPage reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({
  error: '',
  activeRequests: 0
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOADING':
      const requests = state.get('activeRequests')
      return state
        .set('activeRequests', (action.loading) ? (requests + 1) : (requests - 1))
    case 'ERROR':
      return state
        .set('error', action.error)

    default:
      return state;
  }
}

export default appReducer;
