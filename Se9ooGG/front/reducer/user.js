export const initialState = {
  isLoggedIn: false,
  isLoginSuccess: false,
  isLogoutSuccess: false,
  user: null,
  loginData: {},
  signUpData: {},
}

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const LoginAction = (data) => {
  return {
    type: LOG_IN,
    data
  }
};

export const LogoutAction = () => {
  return {
    type: LOG_OUT,
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        isLoginSuccess: true,
        isLogoutSuccess: false,
        user: action.data,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        isLoginSuccess: false,
        isLogoutSuccess: true,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;