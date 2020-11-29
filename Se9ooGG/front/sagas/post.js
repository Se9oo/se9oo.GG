import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { 
  ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, 
  DELETE_POST_FAILURE, DELETE_POST_SUCCESS, DELETE_POST_REQUEST, 
  ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST,
  DELETE_COMMENT_FAILURE, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_REQUEST, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE 
} from '../reducer/post';
import axios from 'axios';

function loadPostAPI() {
  return axios.get('/post/loadPost');
}

function addPostAPI(data) {
  return axios.post('/post/addPost', data);
}

function deletePostAPI(data) {
  return axios.delete('/post/deletePost/:postId', {
    data: data,
  });
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/addComment`, data);
}

function deleteCommentAPI(data) {
  return axios.delete(`/post/${data.postId}/deleteComment/${data.commentId}`, {
    data: data,
  });
}

function* loadPost() {
  try {
    const result = yield call(loadPostAPI);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    })
  }
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    action.data.postId = result;
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
    yield call(deletePostAPI, action.data);
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
    yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response,
    });
  }
}

function* deleteComment(action) {
  try {
    yield call(deleteCommentAPI, action.data);
    yield put({
      type: DELETE_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_COMMENT_FAILURE,
      data: err.response,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
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
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchDeletePost),
    fork(watchAddComment),
    fork(watchDeleteComment),
  ])
}