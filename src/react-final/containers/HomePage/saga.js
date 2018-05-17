 import {
   takeEvery,
   call,
   put,
   select
  } from 'redux-saga/effects';

  import {
    GET_TAGS_REQUEST,
    GET_TAGS_SUCCESS,
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS,
    TOGGLE_FAVORITE_REQUEST,
    TOGGLE_FAVORITE_SUCCESS
  } from './constants'

  import {
    doGetTags,
    doGetArticles,
    doToggleFavorite
  } from '../../utils/api'

// Individual exports for testing
function* doGetTagsRequest(action) {
  try {
    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    const data = yield call(doGetTags)

    yield put({type: 'LOADING', loading: false})
    yield put({type:GET_TAGS_SUCCESS, tags: data.data.tags})
  } catch (err) {
    yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: 'Some thing wrong when Get tags'})
  }
}

function* doGetArticlesRequest(action) {

  try {
    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    let { params } = action.payload
    params = (typeof params === 'string') ? JSON.parse(params) : params

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

export default function* defaultSaga() {
  yield takeEvery(GET_TAGS_REQUEST, doGetTagsRequest)
  yield takeEvery(GET_ARTICLES_REQUEST, doGetArticlesRequest)
  yield takeEvery(TOGGLE_FAVORITE_REQUEST, doToggleFavoriteRequest)
}
