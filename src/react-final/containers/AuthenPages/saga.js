 import {
   takeLatest,
   takeEvery,
   call,
   put,
   select
  } from 'redux-saga/effects';

  import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    SETTING_UPDATE,
    SETTING_UPDATE_SUCCESS
  } from './constants'

  import {
    doRegister,
    doLogin,
    doUpdate
  } from '../../utils/api'

// Individual exports for testing
function* doSignupRequest(action) {
  try {
    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    const data = yield call(doRegister, {"user": action.payload})

    yield put({type: 'LOADING', loading: false})
    yield put({type:SIGNUP_SUCCESS, loggedUser: data.data.user})
  } catch (err) {
    yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: 'Some thing wrong when Signup'})
  }
}

function* doLoginRequest(action) {
  try {
    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    const data = yield call(doLogin, {"user": action.payload})

    yield put({type: 'LOADING', loading: false})
    yield put({type:LOGIN_SUCCESS, loggedUser: data.data.user})
  } catch (err) {
    yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: 'Some thing wrong when Login'})
  }
}

function* doUpdateSetting(action) {
  try {
    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    const data = yield call(doUpdate, {"user": action.payload})

    yield put({type: 'LOADING', loading: false})
    yield put({type:SETTING_UPDATE_SUCCESS, loggedUser: data.data.user})
    
  } catch (err) {
    yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: 'Some thing wrong when Update setting'})
  }
}

export default function* defaultSaga() {
  yield takeLatest(SIGNUP_REQUEST, doSignupRequest)
  yield takeLatest(LOGIN_REQUEST, doLoginRequest)
  yield takeLatest(SETTING_UPDATE, doUpdateSetting)
}
