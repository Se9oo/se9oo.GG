export const initialState = {
  postList: [
    {
      user: {
        email: 'se9oo@kakao.com',
        nickname: '세구'
      },
      title: '여기는 제목이다',
      content: '내용이야!',
      comments: [
        {
          user: {
            email: 'hong@kakao.com',
            nickname: '홍구'
          },
          content: '재밌어'
        }
      ]
    }
  ]
};

// 글등록
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const addPostRequestAction = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        postList: [action.data, ...state.postList]
      }
    case ADD_POST_FAILURE:
      return {
        ...state,
      }
    
    default:
      return state;
  }
};

export default reducer;