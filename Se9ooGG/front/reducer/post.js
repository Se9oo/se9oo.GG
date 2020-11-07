import shortId from 'shortid';

export const initialState = {
  postList: [
    {
      postId: shortId.generate(),
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
  ],
  addPostLoading: false,
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
        addPostLoading: true,
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        postList: [action.data, ...state.postList],
        addPostLoading: false,
      }
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
      }
    
    default:
      return state;
  }
};

export default reducer;