import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { LOAD_SUMMONER_FAILURE, LOAD_SUMMONER_INGAME_FAILURE, LOAD_SUMMONER_INGAME_REQUEST, LOAD_SUMMONER_INGAME_SUCCESS, LOAD_SUMMONER_REQUEST, LOAD_SUMMONER_SUCCESS } from '../reducer/statistic';

// 사용자 전적 가져오기
function loadSummonerAPI (data) {
  return axios.get('/statistic/loadSummoner', { params: data })
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
      data: err.response.data,
    });
  }
}

// 사용자 인게임 정보 가져오기
function loadSummonerInGameAPI (data) {
  return axios.get(`/statistic/loadSummonerInGame/${data.summonerName}`);
}

function* loadSummonerInGame(action) {
  try {
    const result = yield call(loadSummonerInGameAPI, action.data);
    yield put({
      type: LOAD_SUMMONER_INGAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_SUMMONER_INGAME_FAILURE,
      data: err.response.data,
    })
  }
}

function* watchLoadSummonerInfo() {
  yield takeLatest(LOAD_SUMMONER_REQUEST, loadSummoner);
}

function* watchLoadSummonerInGame() {
  yield takeLatest(LOAD_SUMMONER_INGAME_REQUEST, loadSummonerInGame);
}

export default function* statisticSaga() {
  yield all([
    fork(watchLoadSummonerInfo),
    fork(watchLoadSummonerInGame),
  ])
}