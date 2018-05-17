import { takeEvery, call, put, select } from 'redux-saga/effects';

import {
  UPDATE_ARTICLE_REQUEST,
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS,
  GET_COMMENTS_ARTICLE_REQUEST,
  GET_COMMENTS_ARTICLE_SUCCESS
} from './constants'

import {
  doUpdateArticleApi,
  doGetArticleApi,
  doGetComments
} from '../../utils/api'

function* doUpdateArticle(action) {
  try {
    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    const data = yield call(doUpdateArticleApi, {"articleData": action.payload.articleData})
    yield put({type: 'LOADING', loading: false})

  } catch (error) {
     yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: 'Some thing wrong when Update article'})
  }
}

function* doGetArticle(action) {
  try {
    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    const { slug, token } = action.payload

    const { data: { article } } = yield call(
      doGetArticleApi,
      {
        slug: slug,
        token: token
      }
    )
    yield put({type: GET_ARTICLE_SUCCESS, article: article})
    yield put({
      type: GET_COMMENTS_ARTICLE_REQUEST,
      payload: {
        slug: slug,
        token: token
      }
    })
    yield put({type: 'LOADING', loading: false})

  } catch (error) {
     yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: 'Some thing wrong when Update article'})
  }
}

function* doGetCommentsArticle(action) {
  try {
    yield put({type: 'LOADING', loading: true})
    yield put({type: 'ERROR', error: ''})

    // translations: [{title: localeTitle}]}

    const { data: { comments } } = yield call(
      doGetComments,
      {
        slug: action.payload.slug,
        token: action.payload.token
      }
    )
    
    console.log(comments)
    yield put({type: GET_COMMENTS_ARTICLE_SUCCESS, comments: comments})
    yield put({type: 'LOADING', loading: false})

  } catch (error) {
     yield put({type: 'LOADING', loading: false})
    yield put({type: 'ERROR', error: 'Some thing wrong when Update article'})
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(UPDATE_ARTICLE_REQUEST, doUpdateArticle)
  yield takeEvery(GET_ARTICLE_REQUEST, doGetArticle)
  yield takeEvery(GET_COMMENTS_ARTICLE_REQUEST, doGetCommentsArticle)
}
