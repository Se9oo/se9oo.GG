import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_CHAMPION_COMMENTS_REQUEST,
  LOAD_CHAMPION_COMMENTS_SUCCESS,
  LOAD_CHAMPION_COMMENTS_FAILURE,
  ADD_CHAMPION_COMMENT_REQUEST,
  ADD_CHAMPION_COMMENT_FAILURE,
  ADD_CHAMPION_COMMENT_SUCCESS,
  CANCEL_CHAMPION_COMMENT_FAILURE,
  CANCEL_CHAMPION_COMMENT_SUCCESS,
  CANCEL_CHAMPION_COMMENT_REQUEST,
} from '../reducer/champion';
import axios from 'axios';

// 챔피언 한줄평 조회
function loadChampionCommentsAPI(data) {
  return axios.get(`/champion/comments/${data.championName}/${data.page}`);
}

function* loadChampionComments(action) {
  try {
    const result = yield call(loadChampionCommentsAPI, action.data);
    yield put({
      type: LOAD_CHAMPION_COMMENTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_CHAMPION_COMMENTS_FAILURE,
      data: err.response.data,
    });
  }
}

// 챔피언 한줄평 등록
function addChampionCommentAPI(data) {
  return axios.post(`/champion/comment`, data);
}

function* addChampionComment(action) {
  try {
    const result = yield call(addChampionCommentAPI, action.data);
    yield put({
      type: ADD_CHAMPION_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: ADD_CHAMPION_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

// 챔피언 한줄평 취소
function cancelChampionCommentAPI(data) {
  return axios.put(`/champion/comment`, data);
}

function* cancelChampionComment(action) {
  try {
    const result = yield call(cancelChampionCommentAPI, action.data);
    yield put({
      type: CANCEL_CHAMPION_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CANCEL_CHAMPION_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadChampionComments() {
  yield takeLatest(LOAD_CHAMPION_COMMENTS_REQUEST, loadChampionComments);
}

function* watchAddChampionComment() {
  yield takeLatest(ADD_CHAMPION_COMMENT_REQUEST, addChampionComment);
}

function* watchCancelChampionComment() {
  yield takeLatest(CANCEL_CHAMPION_COMMENT_REQUEST, cancelChampionComment);
}

export default function* championSaga() {
  yield all([fork(watchLoadChampionComments), fork(watchAddChampionComment), fork(watchCancelChampionComment)]);
}
