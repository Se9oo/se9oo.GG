import { all, delay, fork, put, take, takeLatest } from 'redux-saga/effects';
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
   LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS } from '../reducer/user';

function* login(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      //data: action.data,
      data: {
        email: 'se9oo@kakao.com',
        nickname: '세구',
        userPostCount: 10,
        level: 20,
        signupDate: '2020.11.02',
      }
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      data: err.response.data,
    });
  }
}

function* logout() {
  try {
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
  ]);
}