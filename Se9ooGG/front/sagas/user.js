import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
} from '../reducer/user';
import axios from 'axios';

function loginAPI(data) {
  return axios.post('/user/login', data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data[0],
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      data: err.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post('/user/logout');
}

function* logout() {
  try {
    yield call(logoutAPI);
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
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      data: err.response,
    });
  }
}

// 내 정보 가져오기
function loadMyInfoAPI() {
  return axios.get('/user/loadMyInfo');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      data: err.response.data,
    });
  }
}

// 비밀번호 변경하기
function changePasswordAPI(data) {
  return axios.put('/user/password', data);
}

function* changePassword(action) {
  try {
    yield call(changePasswordAPI, action.data);
    yield put({
      type: CHANGE_PASSWORD_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: CHANGE_PASSWORD_FAILURE,
      data: err.response.data,
    });
  }
}

// 프로필 이미지 등록하기
function uploadProfileImageAPI(data) {
  return axios.post('/user/profile-image', data);
}

function* uploadProfileImage(action) {
  try {
    const result = yield call(uploadProfileImageAPI, action.data);
    yield put({
      type: UPLOAD_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_PROFILE_IMAGE_FAILURE,
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

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}

function* watchUploadProfileImage() {
  yield takeLatest(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImage);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchLoadMyInfo),
    fork(watchChangePassword),
    fork(watchUploadProfileImage),
  ]);
}
