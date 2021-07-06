export const initialState = {
  postList: [],
  myPostList: [],
  commentList: [],
  editPostInfo: {},
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: false,
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: false,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: false,
  deleteCommentLoading: false,
  deleteCommentDone: false,
  deleteCommentError: false,
  loadMyPostLoading: false,
  loadMyPostDone: false,
  loadMyPostError: false,
  myPostCount: 0,
  existMorePosts: true,
  loadCommentsLoading: false,
  loadCommentsDone: false,
  loadCommentsError: false,
  loadEditPostInfoLoading: false,
  loadEditPostInfoDone: false,
  loadEditPostInfoError: false,
};

// 글목록 불러오기
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

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
export const LOAD_MY_POSTS_REQUEST = 'LOAD_MY_POSTS_REQUEST';
export const LOAD_MY_POSTS_SUCCESS = 'LOAD_MY_POSTS_SUCCESS';
export const LOAD_MY_POSTS_FAILURE = 'LOAD_MY_POSTS_FAILURE';

// 수정할 게시글 불러오기
export const LOAD_EDIT_POST_INFO_REQUEST = 'LOAD_EDIT_POST_INFO_REQUEST';
export const LOAD_EDIT_POST_INFO_SUCCESS = 'LOAD_EDIT_POST_INFO_SUCCESS';
export const LOAD_EDIT_POST_INFO_FAILURE = 'LOAD_EDIT_POST_INFO_FAILURE';

// 특정 게시글 댓글 불러오기
export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const loadPostsRequestAction = (lastPostId) => {
  return {
    type: LOAD_POSTS_REQUEST,
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

export const loadMyPostsRequestAction = (data) => {
  return {
    type: LOAD_MY_POSTS_REQUEST,
    data,
  };
};

export const loadEditPostInfoRequestAction = (data) => {
  return {
    type: LOAD_EDIT_POST_INFO_REQUEST,
    data,
  };
};

export const loadCommentsRequestAction = (postId) => {
  return {
    type: LOAD_COMMENTS_REQUEST,
    postId,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      return {
        ...state,
        loadPostsLoading: true,
        loadPostsDone: false,
        loadPostsError: false,
      };
    case LOAD_POSTS_SUCCESS:
      const newPostList = [...state.postList, ...action.data];
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDone: true,
        loadPostsError: false,
        postList: newPostList,
        existMorePosts: action.data.length !== 0,
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDone: false,
        loadPostsError: true,
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
        myPostList: [...state.myPostList].filter((v) => v.postId !== action.data.postId),
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        deletePostLoading: false,
        deletePostDone: false,
        deletePostError: true,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: false,
      };
    case ADD_COMMENT_SUCCESS:
      // postList
      const addPostIndex = state.postList.findIndex((v) => v.postId === parseInt(action.data.postId));
      let addPost;
      let addPostList;
      if (addPostIndex !== -1) {
        addPost = { ...state.postList[addPostIndex] };
        addPost.comments = [...addPost.comments, action.data];
        addPostList = [...state.postList];
        addPostList[addPostIndex] = addPost;
      }

      // myPostList
      const addMyPostIndex = state.myPostList.findIndex((v) => v.postId === parseInt(action.data.postId));
      let addMyPost;
      let addMyPostList;
      if (addMyPostIndex !== -1) {
        addMyPost = { ...state.myPostList[addMyPostIndex] };
        addMyPost.comments = [...addMyPost.comments, action.data];
        addMyPostList = [...state.myPostList];
        addMyPostList[addMyPostIndex] = addMyPost;
      }

      return {
        ...state,
        postList: addPostIndex !== -1 ? addPostList : [],
        myPostList: addMyPostIndex !== -1 ? addMyPostList : [],
        commentList: [...state.commentList, action.data],
        addCommentLoading: false,
        addCommentDone: true,
        addCommentError: false,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: false,
        addCommentError: true,
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
      let deletePost;
      let deletePostList;
      if (deletePostIndex !== -1) {
        deletePost = { ...state.postList[deletePostIndex] };
        deletePost.comments = [...deletePost.comments].filter((comment) => comment.commentId !== action.data.commentId);
        deletePostList = [...state.postList];
        deletePostList[deletePostIndex] = deletePost;
      }

      const deleteMyPostIndex = state.myPostList.findIndex((v) => v.postId === parseInt(action.data.postId));
      let deleteMyPost;
      let deleteMyPostList;
      if (deleteMyPostIndex !== -1) {
        deleteMyPost = { ...state.myPostList[deleteMyPostIndex] };
        deleteMyPost.comments = [...deleteMyPost.comments].filter(
          (comment) => comment.commentId !== action.data.commentId
        );
        deleteMyPostList = [...state.myPostList];
        deleteMyPostList[deleteMyPostIndex] = deleteMyPost;
      }

      return {
        ...state,
        postList: deletePostIndex !== -1 ? deletePostList : [],
        myPostList: deleteMyPostIndex !== -1 ? deleteMyPostList : [],
        commentList: [...state.commentList].filter((comment) => comment.commentId !== action.data.commentId),
        deleteCommentLoading: false,
        deleteCommentDone: true,
        deleteCommentError: false,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        deleteCommentLoading: false,
        deleteCommentDone: false,
        deleteCommentError: true,
      };
    case LOAD_MY_POSTS_REQUEST:
      return {
        ...state,
        loadMyPostsLoading: true,
        loadMyPostsDone: false,
        loadMyPostsError: false,
      };
    case LOAD_MY_POSTS_SUCCESS:
      return {
        ...state,
        myPostList: action.data.myPostList,
        myPostCount: action.data.myPostCount,
        loadMyPostsLoading: false,
        loadMyPostsDone: true,
        loadMyPostsError: false,
      };
    case LOAD_MY_POSTS_FAILURE:
      return {
        ...state,
        loadMyPostsLoading: false,
        loadMyPostsDone: false,
        loadMyPostsError: true,
        myPostCount: 0,
      };
    case LOAD_COMMENTS_REQUEST:
      return {
        ...state,
        loadCommentsLoading: true,
        loadCommentsDone: false,
        loadCommentsError: false,
      };
    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        loadCommentsLoading: false,
        loadCommentsDone: true,
        loadCommentsError: false,
        commentList: [...action.data],
      };
    case LOAD_COMMENTS_FAILURE:
      return {
        ...state,
        loadCommentsLoading: false,
        loadCommentsDone: false,
        laodCommentsError: true,
      };
    case LOAD_EDIT_POST_INFO_REQUEST:
      return {
        ...state,
        loadEditPostInfoLoading: true,
        loadEditPostInfoDone: false,
        loadEditPostInfoError: false,
      };
    case LOAD_EDIT_POST_INFO_SUCCESS:
      return {
        ...state,
        editPostInfo: action.data,
        loadEditPostInfoLoading: false,
        loadEditPostInfoDone: true,
        loadEditPostInfoError: false,
      };
    case LOAD_EDIT_POST_INFO_FAILURE:
      return {
        ...state,
        loadEditPostInfoLoading: false,
        loadEditPostInfoDone: false,
        loadEditPostInfoError: true,
      };
    default:
      return state;
  }
};

export default reducer;
