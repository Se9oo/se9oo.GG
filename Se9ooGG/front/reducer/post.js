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
          commentId: shortId.generate(),
          content: '재밌어'
        },
        {
          user: {
            email: 'hing@kakao.com',
            nickname: '힝구'
          },
          commentId: shortId.generate(),
          content: '댓글은 두개여야지'
        }
      ]
    }
  ],
  addPostLoading: false,
  deletePostLoading: false,
  addCommentLoading: false,
};

// 글등록
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

// 글삭제
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

// 댓글 등록
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

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

export const addCommentRequestAction = (data, postId) => {
  console.log(JSON.stringify(data));
  console.log(JSON.stringify(postId));
  return {
    type: ADD_COMMENT_REQUEST,
    data,
    postId
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
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
      }
    case ADD_COMMENT_SUCCESS:
      const postIndex = state.postList.findIndex((v) => v.postId === action.postId);
      const post = { ...state.postList[postIndex] };
      post.comments = [...post.comments, action.data];
      const postList = [...state.postList];
      postList[postIndex] = post;

      return {
        ...state,
        postList,
        addCommentLoading: false,
      }
    case ADD_COMMENT_FAILURE:
      return {
        addCommentLoading: false,
      }
    
    default:
      return state;
  }
};

export default reducer;