import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_MY_POST_REQUEST,
  DELETE_MY_POST_SUCCESS,
  DELETE_MY_POST_FAILURE,
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
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_MY_POSTS_REQUEST,
  LOAD_MY_POSTS_SUCCESS,
  LOAD_MY_POSTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
} from '../reducer/post';
import axios from 'axios';

function loadPostsAPI(lastPostId) {
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

function loadMyPostsAPI() {
  return axios.get(`/post/myposts`);
}

function loadCommentsAPI(postId) {
  return axios.get(`/post/comments?postId=${postId}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastPostId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
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

function* deleteMyPost(action) {
  try {
    yield call(deletePostAPI, action.data);
    yield put({
      type: DELETE_MY_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_MY_POST_FAILURE,
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

function* loadMyPosts() {
  try {
    const result = yield call(loadMyPostsAPI);
    yield put({
      type: LOAD_MY_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_POSTS_FAILURE,
      data: err.response,
    });
  }
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.postId);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function* watchDeleteMyPost() {
  yield takeLatest(DELETE_MY_POST_REQUEST, deleteMyPost);
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

function* watchLoadMyPosts() {
  yield takeLatest(LOAD_MY_POSTS_REQUEST, loadMyPosts);
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchDeletePost),
    fork(watchDeleteMyPost),
    fork(watchAddComment),
    fork(watchAddMyPostComment),
    fork(watchDeleteComment),
    fork(watchDeleteMyPostComment),
    fork(watchLoadMyPosts),
    fork(watchLoadComments),
  ]);
}
