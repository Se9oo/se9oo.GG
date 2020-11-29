import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { LOAD_SUMMONER_FAILURE, LOAD_SUMMONER_REQUEST, LOAD_SUMMONER_SUCCESS } from '../reducer/statistic';

function loadSummonerAPI (data) {
  axios.post('/statistic/loadSummoner', data)
  .then((response) => {
    const accountId = { accountId: response.data }
    return axios.post('/statistic/loadSummonerInfo', accountId);
  });
}

function* loadSummoner(action) {
  try {
    const result = yield call(loadSummonerAPI, action.data);
    yield put({
      type: LOAD_SUMMONER_SUCCESS,
      data: result,
    });
  } catch (err) {
    console.log(`err: ${err}`);
    console.log(`err.json: ${JSON.stringify(err)}`);
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