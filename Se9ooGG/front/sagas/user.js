import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
  LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, 
  SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS,
} from '../reducer/user';
import axios from 'axios';

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

// 회원가입
function signUpAPI(data) {
  return axios.post('/user/signup', data);
}

function* signUp(action) {
  try {
    const result = signUpAPI(action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result,
    })
  } catch (err) {
    console.log(err);
    yield put({
      type: SIGN_UP_FAILURE,
      data: err.response,
    })
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
  ])
}