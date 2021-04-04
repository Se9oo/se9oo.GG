import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './user';
import postSaga from './post';
import statisticSaga from './statistic';
import championSaga from './champion';
import { backURL } from '../config/config';

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga), fork(statisticSaga), fork(championSaga)]);
}
