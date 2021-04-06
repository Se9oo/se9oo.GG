export const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: false,
  logoutLoading: false,
  logoutDone: false,
  logoutError: false,
  signUpLoading: false,
  signUpDone: false,
  signUpError: false,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: false,
  changePasswordLoading: false,
  changePasswordDone: false,
  changePasswordError: false,
  uploadProfileImageLoading: false,
  uploadProfileImageDone: false,
  uploadProfileImageError: false,
  me: null,
};

// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_IN_FAILURE_CLEAR = 'LOG_IN_FAILURE_CLEAR';
// 로그아웃
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
// 회원가입
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_DONE_CLEAR = 'SIGN_UP_DONE_CLEAR';
// 내정보 불러오기
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';
// 비밀번호 변경하기
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';
// 프로필 이미지 등록하기
export const UPLOAD_PROFILE_IMAGE_REQUEST = 'UPLOAD_PROFILE_IMAGE_REQUEST';
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'UPLOAD_PROFILE_IMAGE_SUCCESS';
export const UPLOAD_PROFILE_IMAGE_FAILURE = 'UPLOAD_PROFILE_IMAGE_FAILURE';

export const LoginRequsetAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const LoginErrorClearRequestAction = () => {
  return {
    type: LOG_IN_FAILURE_CLEAR,
  };
};

export const LogoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const SignUpRequestAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

export const SignUpDoneClearRequestAction = () => {
  return {
    type: SIGN_UP_DONE_CLEAR,
  };
};

export const LoadMyInfoRequestAction = () => {
  return {
    type: LOAD_MY_INFO_REQUEST,
  };
};

export const ChangePasswordRequestAction = (data) => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    data,
  };
};

export const uploadProfileImageRequestAction = (data) => {
  return {
    type: UPLOAD_PROFILE_IMAGE_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginError: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginDone: true,
        loginLoading: false,
        me: action.data,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        loginDone: false,
        loginLoading: false,
        me: null,
        loginError: action.data,
      };
    case LOG_IN_FAILURE_CLEAR:
      return {
        ...state,
        loginError: null,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        loginDone: false,
        logoutLoading: false,
        logoutDone: true,
        logoutError: false,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutDone: false,
        logoutError: true,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        signUpError: false,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: true,
      };
    case SIGN_UP_DONE_CLEAR:
      return {
        ...state,
        signUpDone: false,
      };
    case LOAD_MY_INFO_REQUEST:
      return {
        ...state,
        loadMyInfoLoading: true,
      };
    case LOAD_MY_INFO_SUCCESS:
      const me = action.data === null ? null : action.data[0];
      return {
        ...state,
        loadMyInfoLoading: false,
        loadMyInfoDone: true,
        me: me,
      };
    case LOAD_MY_INFO_FAILURE:
      return {
        ...state,
        loadMyInfoLoading: false,
        loadMyInfoDone: false,
        loadMyInfoError: true,
      };
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePasswordLoading: true,
        changePasswordDone: false,
        changePasswordError: false,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordDone: true,
        changePasswordError: false,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordDone: false,
        changePasswordError: true,
      };
    case UPLOAD_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        uploadProfileImageLoading: true,
        uploadProfileImageDone: false,
        uploadProfileImageError: false,
      };
    case UPLOAD_PROFILE_IMAGE_SUCCESS:
      const changedMe = { ...state.me };
      changedMe['profileImage'] = action.data;

      return {
        ...state,
        uploadProfileImageLoading: false,
        uploadProfileImageDone: true,
        uploadProfileImageError: false,
        me: { ...changedMe },
      };
    case UPLOAD_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        uploadProfileImageLoading: false,
        uploadProfileImageDone: false,
        uploadProfileImageError: true,
      };
    default:
      return state;
  }
};

export default reducer;
