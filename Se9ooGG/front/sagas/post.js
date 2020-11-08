import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, DELETE_POST_FAILURE, DELETE_POST_SUCCESS, DELETE_POST_REQUEST } from '../reducer/post';

function* addPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    })
  }
}

function* deletePost(action) {
  try {
    yield delay(1000);
    yield put({
      type: DELETE_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchDeletePost),
  ])
}