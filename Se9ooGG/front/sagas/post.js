import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_MY_POST_COMMENT_REQUEST,
  ADD_MY_POST_COMMENT_SUCCESS,
  ADD_MY_POST_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_MY_POST_COMMENT_REQUEST,
  DELETE_MY_POST_COMMENT_SUCCESS,
  DELETE_MY_POST_COMMENT_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_MY_POST_REQUEST,
  LOAD_MY_POST_SUCCESS,
  LOAD_MY_POST_FAILURE,
} from '../reducer/post';
import axios from 'axios';

function loadPostAPI(lastPostId) {
  return axios.get(`/post/posts?lastPostId=${lastPostId}`);
}

function addPostAPI(data) {
  return axios.post('/post/post', data);
}

function deletePostAPI(data) {
  return axios.delete(`/post/post/${data.postId}`);
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function deleteCommentAPI(data) {
  return axios.delete(`/post/${data.postId}/comment/${data.commentId}`);
}

function loadMyPostAPI() {
  return axios.get(`/post/myposts`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.lastPostId);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
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
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data[0],
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response,
    });
  }
}

function* addMyPostComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_MY_POST_COMMENT_SUCCESS,
      data: result.data[0],
    });
  } catch (err) {
    yield put({
      type: ADD_MY_POST_COMMENT_FAILURE,
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

function* deleteMyPostComment(action) {
  try {
    yield call(deleteCommentAPI, action.data);
    yield put({
      type: DELETE_MY_POST_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_MY_POST_COMMENT_FAILURE,
      data: err.response,
    });
  }
}

function* loadMyPost() {
  try {
    const result = yield call(loadMyPostAPI);
    yield put({
      type: LOAD_MY_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_POST_FAILURE,
      data: err.response,
    });
  }
}

function* watchLoadPost() {
  yield throttle(2000, LOAD_POST_REQUEST, loadPost);
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

function* watchAddMyPostComment() {
  yield takeLatest(ADD_MY_POST_COMMENT_REQUEST, addMyPostComment);
}

function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteComment);
}

function* watchDeleteMyPostComment() {
  yield takeLatest(DELETE_MY_POST_COMMENT_REQUEST, deleteMyPostComment);
}

function* watchLoadMyPost() {
  yield takeLatest(LOAD_MY_POST_REQUEST, loadMyPost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchDeletePost),
    fork(watchAddComment),
    fork(watchAddMyPostComment),
    fork(watchDeleteComment),
    fork(watchDeleteMyPostComment),
    fork(watchLoadMyPost),
  ]);
}
