import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_CHAMPION_COMMENTS_REQUEST,
  LOAD_CHAMPION_COMMENTS_SUCCESS,
  LOAD_CHAMPION_COMMENTS_FAILURE,
} from '../reducer/champion';
import axios from 'axios';

function loadChampionCommentsAPI(data) {
  return axios.get(`/champion/comments/${data.name}/${data.page}`);
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

function* watchLoadChampionComments() {
  yield takeLatest(LOAD_CHAMPION_COMMENTS_REQUEST, loadChampionComments);
}

export default function* championSaga() {
  yield all([fork(watchLoadChampionComments)]);
}
