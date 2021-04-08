export const initialState = {
  postList: [],
  myPostList: [],
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: false,
  addPostLoading: false,
  deletePostLoading: false,
  addCommentLoading: false,
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

// 댓글 등록
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// 댓글 삭제
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

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

export const addCommentRequestAction = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
};

export const deleteCommentRequestAction = (data) => {
  return {
    type: DELETE_COMMENT_REQUEST,
    data,
  };
};

export const loadMyPostRequestAction = (data) => {
  return {
    type: LOAD_MY_POST_REQUEST,
    data,
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
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        postList: [...state.postList].filter((v) => v.postId !== action.data.postId),
        deletePostLoading: false,
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        deletePostLoading: false,
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
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
      };
    case DELETE_COMMENT_SUCCESS:
      const deletePostIndex = state.postList.findIndex((v) => v.postId === parseInt(action.data.postId));
      const deletePost = { ...state.postList[deletePostIndex] };
      deletePost.comments = [...deletePost.comments].filter((comment) => comment.commentId !== action.data.commentId);
      const deletePostList = [...state.postList];
      deletePostList[deletePostIndex] = deletePost;

      return {
        ...state,
        postList: deletePostList,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
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
