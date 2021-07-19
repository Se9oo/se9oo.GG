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
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_MY_POSTS_REQUEST,
  LOAD_MY_POSTS_SUCCESS,
  LOAD_MY_POSTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  LOAD_EDIT_POST_INFO_REQUEST,
  LOAD_EDIT_POST_INFO_SUCCESS,
  LOAD_EDIT_POST_INFO_FAILURE,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAILURE,
  CANCEL_LIKE_REQUEST,
  CANCEL_LIKE_SUCCESS,
  CANCEL_LIKE_FAILURE,
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

function loadMyPostsAPI(data) {
  return axios.get(`/post/myposts/${data.page}`);
}

function loadCommentsAPI(postId) {
  return axios.get(`/post/comments?postId=${postId}`);
}

function loadEditPostInfoAPI(data) {
  return axios.get(`/post/edit/postId=${data.postId}`);
}

// 게시글 좋아요 등록/취소
function likeActionAPI(data) {
  return axios.post(`/post/like`, data);
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

function* loadMyPosts(action) {
  try {
    const result = yield call(loadMyPostsAPI, action.data);
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

function* loadEditPostInfo(action) {
  try {
    const result = yield call(loadEditPostInfoAPI, action.data);
    yield put({
      type: LOAD_EDIT_POST_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_EDIT_POST_INFO_FAILURE,
      data: err.response.data,
    });
  }
}

// 게시글 좋아요 등록
function* addLike(action) {
  try {
    const result = yield call(likeActionAPI, action.data);
    yield put({
      type: ADD_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_LIKE_FAILURE,
      data: err.response.data,
    });
  }
}

// 게시글 좋아요 취소
function* cancelLike(action) {
  try {
    const result = yield call(likeActionAPI, action.data);
    yield put({
      type: CANCEL_LIKE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CANCEL_LIKE_FAILURE,
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

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteComment);
}

function* watchLoadMyPosts() {
  yield takeLatest(LOAD_MY_POSTS_REQUEST, loadMyPosts);
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

function* watchLoadEditPostInfo() {
  yield takeLatest(LOAD_EDIT_POST_INFO_REQUEST, loadEditPostInfo);
}

// 게시글 좋아요 등록
function* watchAddLike() {
  yield takeLatest(ADD_LIKE_REQUEST, addLike);
}

// 게시글 좋아요 취소
function* watchCancelLike() {
  yield takeLatest(CANCEL_LIKE_REQUEST, cancelLike);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchDeletePost),
    fork(watchAddComment),
    fork(watchDeleteComment),
    fork(watchLoadMyPosts),
    fork(watchLoadComments),
    fork(watchLoadEditPostInfo),
    fork(watchAddLike),
    fork(watchCancelLike),
  ]);
}
