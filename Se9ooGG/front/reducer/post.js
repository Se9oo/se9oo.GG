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
  deletePostLoading: false,
};

// 글등록
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

// 글삭제
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const addPostRequestAction = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data
  };
};

export const deletePostRequestAction = (data) => {
  return {
    type: DELETE_POST_REQUEST,
    data
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 글등록
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
    // 글삭제
    case DELETE_POST_REQUEST:
      return {
        ...state,
        deletePostLoading: true,
      }
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        postList: [...state.postList].filter((v) => v.postId !== action.data.postId),
        deletePostLoading: false,
      }
    case DELETE_POST_FAILURE:
      return {
        ...state,
        deletePostLoading: false,
      }
    
    default:
      return state;
  }
};

export default reducer;