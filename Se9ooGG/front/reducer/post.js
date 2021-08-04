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
  // 수정할 게시글 정보 가져오기
  loadEditPostInfoLoading: false,
  loadEditPostInfoDone: false,
  loadEditPostInfoError: false,
  // 게시글 수정하기
  editPostLoading: false,
  editPostDone: false,
  editPostError: false,
  // 게시글 좋아요
  addLikeLoading: false,
  addLikeDone: false,
  addLikeError: false,
  // 게시글 좋아요 취소하기
  cancelLikeLoading: false,
  cancelLikeDone: false,
  cancelLikeError: false,
  // 신고하기
  reportPostLoading: false,
  repostPostDone: false,
  reportPostError: false,
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

// 게시글 수정하기
export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

// 특정 게시글 댓글 불러오기
export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

// 좋아요 등록하기
export const ADD_LIKE_REQUEST = 'ADD_LIKE_REQUEST';
export const ADD_LIKE_SUCCESS = 'ADD_LIKE_SUCCESS';
export const ADD_LIKE_FAILURE = 'ADD_LIKE_FAILURE';

// 좋아요 취소하기
export const CANCEL_LIKE_REQUEST = 'CANCEL_LIKE_REQUEST';
export const CANCEL_LIKE_SUCCESS = 'CANCEL_LIKE_SUCCESS';
export const CANCEL_LIKE_FAILURE = 'CANCEL_LIKE_FAILURE';

// 신고하기
export const REPORT_POST_REQUEST = 'REPORT_POST_REQUEST';
export const REPORT_POST_SUCCESS = 'REPORT_POST_SUCCESS';
export const REPORT_POST_FAILURE = 'REPORT_POST_FAILURE';

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

// 게시글 수정하기
export const editPostRequestAction = (data) => {
  return {
    type: EDIT_POST_REQUEST,
    data,
  }
}

export const loadCommentsRequestAction = (postId) => {
  return {
    type: LOAD_COMMENTS_REQUEST,
    postId,
  };
};

// 좋아요 등록/취소하기
export const likeRequestAction = (data) => {
  return {
    type: data.action === 'add' ? ADD_LIKE_REQUEST : CANCEL_LIKE_REQUEST,
    data,
  };
};

export const reportRequestAction = (data) => {
  return {
    type: REPORT_POST_REQUEST,
    data,
  }
}

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
    // 수정할 게시글 정보 불러오기
    case LOAD_EDIT_POST_INFO_REQUEST:
      return {
        ...state,
        editPostInfo: {},
        loadEditPostInfoLoading: true,
        loadEditPostInfoDone: false,
        loadEditPostInfoError: false,
      };
    case LOAD_EDIT_POST_INFO_SUCCESS:
      const data = action.data[0];
      return {
        ...state,
        editPostInfo: {
          postId: data.post_id,
          postTitle: data.post_title,
          postContent: data.post_content,
          userNickname: data.user_nickname,
        },
        loadEditPostInfoLoading: false,
        loadEditPostInfoDone: true,
        loadEditPostInfoError: false,
      };
    case LOAD_EDIT_POST_INFO_FAILURE:
      return {
        ...state,
        editPostInfo: {},
        loadEditPostInfoLoading: false,
        loadEditPostInfoDone: false,
        loadEditPostInfoError: true,
      };
    // 게시글 수정하기
    case EDIT_POST_REQUEST:
      return {
        ...state,
        editPostLoading: true,
        editPostDone: false,
        editPostError: false,
      };
    case EDIT_POST_SUCCESS:

      const returnValue = {
        ...state,
        editPostLoading: false,
        editPostDone: true,
        editPostError: false,
      };

      // 게시글 목록 update
      const editPostIdx = state.postList.findIndex((post) => post.postId === parseInt(action.data.postId, 10));

      if (editPostIdx !== -1) {
        // 깊은 복사
        const editPostList = JSON.parse(JSON.stringify(state.postList));
        editPostList[editPostIdx].title = action.data.postTitle;
        editPostList[editPostIdx].content = action.data.postContent;
        returnValue.postList = [...editPostList];
      };

      // 내 게시글 목록 update
      const editMyPostIdx = state.myPostList.findIndex((post) => post.postId === parseInt(action.data.postId, 10));

      if (editMyPostIdx !== -1) {
        // 깊은 복사
        const editMyPostList = JSON.parse(JSON.stringify(state.myPostList));
        editMyPostList[editMyPostIdx].title = action.data.postTitle;
        editMyPostList[editMyPostIdx].content = action.data.postContent;
        returnValue.myPostList = editMyPostList;
      };

      return returnValue;

    case EDIT_POST_FAILURE:
      return {
        ...state,
        editPostLoading: false,
        editPostDone: false,
        editPostError: false,
      };
    // 게시글 좋아요 등록
    case ADD_LIKE_REQUEST:
      return {
        ...state,
        addLikeLoading: true,
        addLikeDone: false,
        addLikeError: false,
      };
    case ADD_LIKE_SUCCESS:
      // 좋아요 누른 post의 index
      const likePostIdx = state.postList.findIndex((post) => post.postId === parseInt(action.data));
      // post 정보 복사
      const likePost = {...state.postList[likePostIdx]};

      likePost.likeCount++;
      likePost.isLike = true;

      state.postList[likePostIdx] = likePost;

      // 좋아요 누른 myPost의 index
      const myLikePostIdx = state.myPostList.findIndex((post) => post.postId === parseInt(action.data));
      // myPost의 정보 복사
      const likeMyPost = {...state.myPostList[myLikePostIdx]};

      likeMyPost.likeCount++;
      likeMyPost.isLike = true;

      state.myPostList[myLikePostIdx] = likeMyPost;

      return {
        ...state,
        addLikeLoading: false,
        addLikeDone: true,
        addLikeError: false,
      };
    case ADD_LIKE_FAILURE:
      return {
        ...state,
        addLikeLoading: false,
        addLikeDone: false,
        addLikeError: true,
      };
    case CANCEL_LIKE_REQUEST:
      return {
        ...state,
        cancelLikeLoading: true,
        cancelLikeDone: false,
        cancelLikeError: false,
      };
    case CANCEL_LIKE_SUCCESS:
      // 좋아요 취소한 post index
      const unlikePostIdx = state.postList.findIndex((post) => post.postId === parseInt(action.data));
      // post 정보 복사
      const unlikePost = {...state.postList[unlikePostIdx]};

      unlikePost.likeCount--;
      unlikePost.isLike = false;

      if (unlikePost.likeCount < 0) unlikePost.likeCount = 0;

      state.postList[unlikePostIdx] = unlikePost;

      // 좋아요 취소한 myPost index
      const unlikeMyPostIdx = state.myPostList.findIndex((post) => post.postId === parseInt(action.data));
      // myPost 정보 복사
      const unlikeMyPost = {...state.myPostList[unlikeMyPostIdx]};

      unlikeMyPost.likeCount--;
      unlikeMyPost.isLike = false;

      if (unlikeMyPost.likeCount < 0) unlikeMyPost.likeCount = 0;

      state.myPostList[unlikeMyPostIdx] = unlikeMyPost;

      return {
        ...state,
        cancelLikeLoading: false,
        cancelLikeDone: true,
        cancelLikeError: false,
      };
    case CANCEL_LIKE_FAILURE:
      return {
        ...state,
        cancelLikeLoading: false,
        cancelLikeDone: false,
        cancelLikeError: true,
      };
    case REPORT_POST_REQUEST:
      return {
        ...state,
        reportPostLoading: true,
        reportPostDone: false,
        reportPostError: false,
      };
    case REPORT_POST_SUCCESS:
      return {
        ...state,
        reportPostLoading: false,
        reportPostDone: true,
        reportPostError: false,
      };
    case REPORT_POST_FAILURE:
      return {
        ...state,
        reportPostLoading: false,
        reportPostDone: false,
        reportPostError: true,
      };
    default:
      return state;
  }
};

export default reducer;
