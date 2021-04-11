export const initialState = {
  postList: [],
  myPostList: [],
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: false,
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: false,
  deleteMyPostLoading: false,
  deleteMyPostDone: false,
  deleteMyPostError: false,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: false,
  addMyPostCommentLoading: false,
  addMyPostCommentDone: false,
  addMyPostCommentError: false,
  deleteCommentLoading: false,
  deleteCommentDone: false,
  deleteCommentError: false,
  deleteMyPostCommentLoading: false,
  deleteMyPostCommentDone: false,
  deleteMyPostCommentError: false,
  loadMyPostLoading: false,
  loadMyPostDone: false,
  loadMyPostError: false,
  existMorePosts: true,
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

// 내 게시글 삭제
export const DELETE_MY_POST_REQUEST = 'DELETE_MY_POST_REQUEST';
export const DELETE_MY_POST_SUCCESS = 'DELETE_MY_POST_SUCCESS';
export const DELETE_MY_POST_FAILURE = 'DELETE_MY_POST_FAILURE';

// 댓글 등록
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// 내 게시글 댓글 등록
export const ADD_MY_POST_COMMENT_REQUEST = 'ADD_MY_POST_COMMENT_REQUEST';
export const ADD_MY_POST_COMMENT_SUCCESS = 'ADD_MY_POST_COMMENT_SUCCESS';
export const ADD_MY_POST_COMMENT_FAILURE = 'ADD_MY_POST_COMMENT_FAILURE';

// 댓글 삭제
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

// 내 게시글 댓글 삭제
export const DELETE_MY_POST_COMMENT_REQUEST = 'DELETE_MY_POST_COMMENT_REQUEST';
export const DELETE_MY_POST_COMMENT_SUCCESS = 'DELETE_MY_POST_COMMENT_SUCCESS';
export const DELETE_MY_POST_COMMENT_FAILURE = 'DELETE_MY_POST_COMMENT_FAILURE';

// 내 게시글 불러오기
export const LOAD_MY_POST_REQUEST = 'LOAD_MY_POST_REQUEST';
export const LOAD_MY_POST_SUCCESS = 'LOAD_MY_POST_SUCCESS';
export const LOAD_MY_POST_FAILURE = 'LOAD_MY_POST_FAILURE';

export const loadPostRequestAction = (lastPostId) => {
  return {
    type: LOAD_POST_REQUEST,
    lastPostId,
  };
};

export const addPostRequestAction = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
};

export const deletePostRequestAction = (data) => {
  return {
    type: DELETE_POST_REQUEST,
    data,
  };
};

export const deleteMyPostRequestAction = (data) => {
  return {
    type: DELETE_MY_POST_REQUEST,
    data,
  };
};

export const addCommentRequestAction = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
};

export const addMyPostCommentRequestAction = (data) => {
  return {
    type: ADD_MY_POST_COMMENT_REQUEST,
    data,
  };
};

export const deleteCommentRequestAction = (data) => {
  return {
    type: DELETE_COMMENT_REQUEST,
    data,
  };
};

export const deleteMyPostCommentRequestAction = (data) => {
  return {
    type: DELETE_MY_POST_COMMENT_REQUEST,
    data,
  };
};

export const loadMyPostRequestAction = () => {
  return {
    type: LOAD_MY_POST_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POST_REQUEST:
      return {
        ...state,
        loadPostLoading: true,
        loadPostDone: false,
        loadPostError: false,
      };
    case LOAD_POST_SUCCESS:
      const newPostList = [...state.postList, ...action.data];
      return {
        ...state,
        loadPostLoading: false,
        loadPostDone: true,
        loadPostError: false,
        postList: newPostList,
        existMorePosts: action.data.length !== 0,
      };
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loadPostLoading: false,
        loadPostDone: false,
        loadPostError: true,
      };
    // 글등록
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: false,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        addPostError: false,
        postList: [action.data, ...state.postList],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: false,
        addPostError: true,
      };
    // 글삭제
    case DELETE_POST_REQUEST:
      return {
        ...state,
        deletePostLoading: true,
        deletePostDone: false,
        deletePostError: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deletePostLoading: false,
        deletePostDone: true,
        deletePostError: false,
        postList: [...state.postList].filter((v) => v.postId !== action.data.postId),
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        deletePostLoading: false,
        deletePostDone: false,
        deletePostError: true,
      };
    // 내 게시글 삭제
    case DELETE_MY_POST_REQUEST:
      return {
        ...state,
        deleteMyPostLoading: true,
        deleteMyPostDone: false,
        deleteMyPostError: false,
      };
    case DELETE_MY_POST_SUCCESS:
      return {
        ...state,
        deleteMyPostLoading: false,
        deleteMyPostDone: true,
        deleteMyPostError: false,
        myPostList: [...state.myPostList].filter((v) => v.postId !== action.data.postId),
      };
    case DELETE_MY_POST_FAILURE:
      return {
        ...state,
        deleteMyPostLoading: false,
        deleteMyPostDone: false,
        deleteMyPostError: true,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
      };
    case ADD_COMMENT_SUCCESS:
      const addPostIndex = state.postList.findIndex((v) => v.postId === parseInt(action.data.postId));
      const addPost = { ...state.postList[addPostIndex] };
      addPost.comments = [...addPost.comments, action.data];
      const addPostList = [...state.postList];
      addPostList[addPostIndex] = addPost;

      return {
        ...state,
        postList: addPostList,
        addCommentLoading: false,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
      };
    case ADD_MY_POST_COMMENT_REQUEST:
      return {
        ...state,
        addMyPostCommentLoading: true,
        addMyPostCommentDone: false,
        addMyPostCommentError: false,
      };
    case ADD_MY_POST_COMMENT_SUCCESS:
      const addMyPostIndex = state.myPostList.findIndex((v) => v.postId === parseInt(action.data.postId));
      const addMyPost = { ...state.myPostList[addMyPostIndex] };
      addMyPost.comments = [...addMyPost.comments, action.data];
      const addMyPostList = [...state.myPostList];
      addMyPostList[addMyPostIndex] = addMyPost;

      return {
        ...state,
        myPostList: addMyPostList,
        addMyPostCommentLoading: false,
        addMyPostCommentDone: true,
        addMyPostCommentError: false,
      };
    case ADD_MY_POST_COMMENT_FAILURE:
      return {
        ...state,
        addMyPostCommentLoading: false,
        addMyPostCommentDone: false,
        addMyPostCommentError: true,
      };
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        deleteCommentLoading: true,
        deleteCommentDone: false,
        deleteCommentError: false,
      };
    case DELETE_COMMENT_SUCCESS:
      const deletePostIndex = state.postList.findIndex((v) => v.postId === parseInt(action.data.postId));
      const deletePost = { ...state.postList[deletePostIndex] };
      deletePost.comments = [...deletePost.comments].filter((comment) => comment.commentId !== action.data.commentId);
      const deletePostList = [...state.postList];
      deletePostList[deletePostIndex] = deletePost;

      return {
        ...state,
        deleteCommentLoading: false,
        deleteCommentDone: true,
        deleteCommentError: false,
        postList: deletePostList,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        deleteCommentLoading: false,
        deleteCommentDone: false,
        deleteCommentError: true,
      };

    case DELETE_MY_POST_COMMENT_REQUEST:
      return {
        ...state,
        deleteMyPostCommentLoading: true,
        deleteMyPostCommentDone: false,
        deleteMyPostCommentError: false,
      };
    case DELETE_MY_POST_COMMENT_SUCCESS:
      const deleteMyPostIndex = state.myPostList.findIndex((v) => v.postId === parseInt(action.data.postId));
      const deleteMyPost = { ...state.myPostList[deleteMyPostIndex] };
      deleteMyPost.comments = [...deleteMyPost.comments].filter(
        (comment) => comment.commentId !== action.data.commentId
      );
      const deleteMyPostList = [...state.myPostList];
      deleteMyPostList[deleteMyPostIndex] = deleteMyPost;

      return {
        ...state,
        deleteMyPostCommentLoading: false,
        deleteMyPostCommentDone: true,
        deleteMyPostCommentError: false,
        myPostList: deleteMyPostList,
      };
    case DELETE_MY_POST_COMMENT_FAILURE:
      return {
        ...state,
        deleteMyPostCommentLoading: false,
        deleteMyPostCommentDone: false,
        deleteMyPostCommentError: true,
      };

    case LOAD_MY_POST_REQUEST:
      return {
        ...state,
        loadMyPostLoading: true,
        loadMyPostDone: false,
        loadMyPostError: false,
      };
    case LOAD_MY_POST_SUCCESS:
      return {
        ...state,
        myPostList: action.data,
        loadMyPostLoading: false,
        loadMyPostDone: true,
        loadMyPostError: false,
      };
    case LOAD_MY_POST_FAILURE:
      return {
        ...state,
        loadMyPostLoading: false,
        loadMyPostDone: false,
        loadMyPostError: true,
      };
    default:
      return state;
  }
};

export default reducer;
