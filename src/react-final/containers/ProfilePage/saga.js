import {
  takeEvery,
  call,
  put
} from 'redux-saga/effects';

import {
  DEFAULT_ACTION,
  PROFILE_GET_PROFILE_REQUEST,
  PROFILE_GET_PROFILE_SUCCESS,
  PROFILE_TOGGLE_FOLLOW_USER_REQUEST,
  PROFILE_TOGGLE_FOLLOW_USER_SUCCESS
} from './constants';

import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  TOGGLE_FAVORITE_REQUEST,
  TOGGLE_FAVORITE_SUCCESS
} from '../HomePage/constants';

import {
  doGetProfileAPI,
  doToggleFavorite,
  doGetArticles,
  doToggleFollowUserAPI
} from '../../utils/api'

function* doGetProfile(action) {
  try {
    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    const data = yield call(
      doGetProfileAPI,
      {
        username: action.payload.username,
        token: action.payload.token
      }
    )

    yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: ''})
    yield put({
      type:PROFILE_GET_PROFILE_SUCCESS,
      payload: {
        userProfile: data.data.profile
      }
    })

  } catch (error) {
    yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: 'Some thing wrong when Get profile'})
  }
}

function* doGetArticlesRequest(action) {
  try {
    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    const params = (typeof action.payload.params === 'string')
    ? JSON.parse(action.payload.params)
    : action.payload.params

    const data = yield call(
      doGetArticles,
      {
        params: params,
        token: action.payload.token
      }
    )

    yield put({type: 'LOADING', loading: false})
    yield put({
      type:GET_ARTICLES_SUCCESS,
      articles: data.data.articles,
      articlesCount: data.data.articlesCount,
      currPage: action.payload.currPage
    })

  } catch (err) {
    yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: 'Some thing wrong when Get tags'})
  }
}

function* doToggleFavoriteRequest(action) {
  try {

    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    const data = yield call(
      doToggleFavorite,
      {
        token: action.payload.token,
        favorited: action.payload.favorited,
        slug: action.payload.slug
      }
    )

    yield put({type: 'LOADING', loading: false})
    yield put({
      type:TOGGLE_FAVORITE_SUCCESS,
      article: data.data.article
    })
  } catch (err) {
    yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: 'Some thing wrong when Get tags'})
  }
}

function* doToggleFollowUser(action) {
  try {

    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    const data = yield call(
      doToggleFollowUserAPI,
      {
        token: action.payload.token,
        username: action.payload.username,
        following: action.payload.following,
      }
    )

    yield put({type: 'LOADING', loading: false})
    yield put({
      type:PROFILE_TOGGLE_FOLLOW_USER_SUCCESS,
      payload: {
        userProfile: data.data.profile
      }
    })
  } catch (err) {
    yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: 'Some thing wrong when Get tags'})
  }
}

export default function* defaultSaga() {
  yield takeEvery(GET_ARTICLES_REQUEST, doGetArticlesRequest)
  yield takeEvery(PROFILE_GET_PROFILE_REQUEST, doGetProfile)
  yield takeEvery(TOGGLE_FAVORITE_REQUEST, doToggleFavoriteRequest)
  yield takeEvery(PROFILE_TOGGLE_FOLLOW_USER_REQUEST, doToggleFollowUser)
}
