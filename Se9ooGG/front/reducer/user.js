export const initialState = {
  isLogoutLoading: false,
  loginLoading: false,
  loginDone: false,
  loginError: false,
  signUpLoading: false,
  signUpDone: false,
  signUpError: false,
  me: null,
}

// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 로그아웃
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
// 회원가입
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_DONE_CLEAR = 'SIGN_UP_DONE_CLEAR';

export const LoginRequsetAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data
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
    data
  };
};

export const SignUpDoneClearRequestAction = () => {
  return {
    type: SIGN_UP_DONE_CLEAR,
  }
}

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
    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLogoutLoading: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        loginDone: false,
        isLogoutLoading: false,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        isLogoutLoading: false,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        signUpError: false,
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: true,
      }
    case SIGN_UP_DONE_CLEAR:
      return {
        ...state,
        signUpDone: false,
      }
    default:
      return state;
  }
};

export default reducer;