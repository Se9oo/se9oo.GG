export const initialState = {
  championCommentsList: [],
  loadChampionCommentsLoading: false,
  loadChampionCommentsSuccess: false,
  loadChampionCommentsError: false,
};

// 챔피언 한줄평 불러오기
export const LOAD_CHAMPION_COMMENTS_REQUEST = 'LOAD_CHAMPION_COMMENTS_REQUEST';
export const LOAD_CHAMPION_COMMENTS_SUCCESS = 'LOAD_CHAMPION_COMMENTS_SUCCESS';
export const LOAD_CHAMPION_COMMENTS_FAILURE = 'LOAD_CHAMPION_COMMENTS_FAILURE';

export const loadChampionCommentsAction = (data) => {
  return {
    type: LOAD_CHAMPION_COMMENTS_REQUEST,
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
        championCommentsList: action.data,
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
    default:
      return state;
  }
};

export default reducer;
