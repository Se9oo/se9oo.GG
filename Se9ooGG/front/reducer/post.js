import shortId from 'shortid';

export const initialState = {
  postList: [
    // {
    //   postId: shortId.generate(),
    //   user: {
    //     email: 'se9oo@kakao.com',
    //     nickname: '세구'
    //   },
    //   title: '여기는 제목이다',
    //   content: '내용이야!',
    //   comments: [
    //     {
    //       user: {
    //         email: 'hong@kakao.com',
    //         nickname: '홍구'
    //       },
    //       commentId: shortId.generate(),
    //       content: '재밌어'
    //     },
    //     {
    //       user: {
    //         email: 'hing@kakao.com',
    //         nickname: '힝구'
    //       },
    //       commentId: shortId.generate(),
    //       content: '댓글은 두개여야지'
    //     }
    //   ]
    // }
  ],
  loadPostDone: false,
  loadPostError: false,
  addPostLoading: false,
  deletePostLoading: false,
  addCommentLoading: false,
};

// 글목록 불러오기
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

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

// 댓글 삭제
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const loadPostRequestAction = () => {
  return {
    type: LOAD_POST_REQUEST,
  }
}

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
  return {
    type: ADD_COMMENT_REQUEST,
    data,
    postId,
  };
};

export const deleteCommentRequestAction = (data, postId) => {
  return {
    type: DELETE_COMMENT_REQUEST,
    data,
    postId,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POST_REQUEST:
      return {
        ...state,
        laodPostError: false,
      }
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        loadPostDone: true,
        postList: action.data,
      }
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loadPostDone: false,
        loadPostError: true,
      }
    // 글등록
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        postList: [...state.postList, action.data],
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
      const addPostIndex = state.postList.findIndex((v) => v.postId === action.postId);
      const addPost = { ...state.postList[addPostIndex] };
      addPost.comments = [...addPost.comments, action.data];
      const addPostList = [...state.postList];
      addPostList[addPostIndex] = addPost;

      return {
        ...state,
        postList: addPostList,
        addCommentLoading: false,
      }
    case ADD_COMMENT_FAILURE:
      return {
        addCommentLoading: false,
      }
    case DELETE_COMMENT_REQUEST:
      return {
        ...state, 
      }
    case DELETE_COMMENT_SUCCESS:
      const deletePostIndex = state.postList.findIndex((v) => v.postId === action.postId);
      const deletePost = { ...state.postList[deletePostIndex] };
      deletePost.comments = [...deletePost.comments].filter((comment) => comment.commentId !== action.data.commentId);
      const deletePostList = [...state.postList];
      deletePostList[deletePostIndex] = deletePost;

      return {
        ...state,
        postList: deletePostList,
      }
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
};

export default reducer;