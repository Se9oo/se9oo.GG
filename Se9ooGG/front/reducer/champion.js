export const initialState = {
  championCommentsList: [],
  totalCommentsCount: 0,
  loadChampionCommentsLoading: false,
  loadChampionCommentsSuccess: false,
  loadChampionCommentsError: false,
  addChampionCommentLoading: false,
  addChampionCommentSuccess: false,
  addChampionCommentError: false,
  cancelChampionCommentLoading: false,
  cancelChampionCommentSuccess: false,
  cancelChampionCommentError: false,
};

// 챔피언 한줄평 불러오기
export const LOAD_CHAMPION_COMMENTS_REQUEST = 'LOAD_CHAMPION_COMMENTS_REQUEST';
export const LOAD_CHAMPION_COMMENTS_SUCCESS = 'LOAD_CHAMPION_COMMENTS_SUCCESS';
export const LOAD_CHAMPION_COMMENTS_FAILURE = 'LOAD_CHAMPION_COMMENTS_FAILURE';

// 챔피언 한줄평 등록
export const ADD_CHAMPION_COMMENT_REQUEST = 'ADD_CHAMPION_COMMENT_REQUEST';
export const ADD_CHAMPION_COMMENT_SUCCESS = 'ADD_CHAMPION_COMMENT_SUCCESS';
export const ADD_CHAMPION_COMMENT_FAILURE = 'ADD_CHAMPION_COMMENT_FAILURE';

// 챔피언 한줄평 취소
export const CANCEL_CHAMPION_COMMENT_REQUEST = 'CANCEL_CHAMPION_COMMENT_REQUEST';
export const CANCEL_CHAMPION_COMMENT_SUCCESS = 'CANCEL_CHAMPION_COMMENT_SUCCESS';
export const CANCEL_CHAMPION_COMMENT_FAILURE = 'CANCEL_CHAMPION_COMMENT_FAILURE';

export const loadChampionCommentsAction = (data) => {
  return {
    type: LOAD_CHAMPION_COMMENTS_REQUEST,
    data,
  };
};

export const addChampionCommentAction = (data) => {
  return {
    type: ADD_CHAMPION_COMMENT_REQUEST,
    data,
  };
};

export const cancelChampionCommentAction = (data) => {
  return {
    type: CANCEL_CHAMPION_COMMENT_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHAMPION_COMMENTS_REQUEST:
      return {
        ...state,
        loadChampionCommentsLoading: true,
        loadChampionCommentsSuccess: false,
        loadChampionCommentsError: false,
      };
    case LOAD_CHAMPION_COMMENTS_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        championCommentsList: [...action.data.championCommentsList],
        totalCommentsCount: action.data.totalCommentsCount,
        loadChampionCommentsLoading: false,
        loadChampionCommentsSuccess: true,
        loadChampionCommentsError: false,
      };
    case LOAD_CHAMPION_COMMENTS_FAILURE:
      return {
        ...state,
        loadChampionCommentsLoading: false,
        loadChampionCommentsSuccess: false,
        loadChampionCommentsError: true,
      };
    case ADD_CHAMPION_COMMENT_REQUEST:
      return {
        ...state,
        addChampionCommentLoading: true,
        addChampionCommentSuccess: false,
        addChampionCOmmentError: false,
      };
    case ADD_CHAMPION_COMMENT_SUCCESS:
      return {
        ...state,
        addChampionCommentLoading: false,
        addChampionCommentSuccess: true,
        addChampionCommentError: false,
      };
    case ADD_CHAMPION_COMMENT_FAILURE:
      return {
        ...state,
        addChampionCommentLoading: false,
        addChampionCommentSuccess: false,
        addChampionCommentError: true,
      };
    case CANCEL_CHAMPION_COMMENT_REQUEST:
      return {
        ...state,
        cancelChampionCommentLoading: true,
        cancelChampionCommentSuccess: false,
        cancelChampionCommentFailure: false,
      };
    case CANCEL_CHAMPION_COMMENT_SUCCESS:
      return {
        ...state,
        cancelChampionCommentLoading: false,
        cancelChampionCommentSuccess: true,
        cancelChampionCommentFailure: false,
      };
    case CANCEL_CHAMPION_COMMENT_FAILURE:
      return {
        ...state,
        cancelChampionCommentLoading: false,
        cancelChampionCommentSuccess: false,
        cancelChampionCommentFailure: true,
      };
    default:
      return state;
  }
};

export default reducer;
