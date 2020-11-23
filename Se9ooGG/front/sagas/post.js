import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { 
  ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, 
  DELETE_POST_FAILURE, DELETE_POST_SUCCESS, DELETE_POST_REQUEST, 
  ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST,
  DELETE_COMMENT_FAILURE, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_REQUEST 
} from '../reducer/post';
import axios from 'axios';

function addPostAPI(data) {
  return axios.post('/post/addPost', data);
}

function* addPost(action) {
  try {
    yield call(addPostAPI, action.data);
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

function* addComment(action) {
  try {
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
      postId: action.postId,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      // data: err.response.data,
    });
  }
}

function* deleteComment(action) {
  try {
    yield delay(1000);
    yield put({
      type: DELETE_COMMENT_SUCCESS,
      data: action.data,
      postId: action.postId,
    });
  } catch (err) {
    yield put({
      type: DELETE_COMMENT_FAILURE,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchDeletePost),
    fork(watchAddComment),
    fork(watchDeleteComment),
  ])
}