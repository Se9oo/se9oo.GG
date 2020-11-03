export const initialState = {
  isLogin: false,
  isLoginLoading: false,
  isLogoutLoading: false,
  me: null,
  loginData: {},
  signUpData: {},
}

// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 로그아웃
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoginLoading: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        isLoginLoading: false,
        me: action.data,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLogin: false,
        isLoginLoading: false,
        me: null,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLogoutLoading: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
        isLogoutLoading: false,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        isLogoutLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;