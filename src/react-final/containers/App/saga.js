import {
  takeEvery,
  call,
  put,
  select
 } from 'redux-saga/effects';

function* setAppLoading(action) {
  try {
    console.log(0)
  } catch (error) {

  }
}

export default function* doGlobalSaga() {
  yield takeEvery('LOADING', setAppLoading)
 }