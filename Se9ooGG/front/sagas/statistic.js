import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { LOAD_SUMMONER_FAILURE, LOAD_SUMMONER_REQUEST, LOAD_SUMMONER_SUCCESS } from '../reducer/statistic';

function loadSummonerAPI (data) {
  return axios.post('/statistic/loadSummoner', data)
}

function* loadSummoner(action) {
  try {
    const result = yield call(loadSummonerAPI, action.data);
    yield put({
      type: LOAD_SUMMONER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_SUMMONER_FAILURE,
      data: err.response,
    });
  }
}

function* watchLoadSummonerInfo() {
  yield takeLatest(LOAD_SUMMONER_REQUEST, loadSummoner);
}

export default function* statisticSaga() {
  yield all([
    fork(watchLoadSummonerInfo),
  ])
}