export const initialState = {
  summoner: {},
  loadSummonerLoading: false,
  loadSummonerDone: false,
  loadSummonerError: null,
};

// 사용자 정보
export const LOAD_SUMMONER_REQUEST = 'LOAD_SUMMONER_REQUEST';
export const LOAD_SUMMONER_SUCCESS = 'LOAD_SUMMONER_SUCCESS';
export const LOAD_SUMMONER_FAILURE = 'LOAD_SUMMONER_FAILURE';
export const LOAD_SUMMONER_DONE_CLEAR = 'LOAD_SUMMONER_DONE_CLEAR';

export const loadSummonerRequestAction = (data) => {
  return {
    type: LOAD_SUMMONER_REQUEST,
    data,
  };
};

export const loadSummonerDoneClearAction = () => {
  return {
    type: LOAD_SUMMONER_DONE_CLEAR,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUMMONER_REQUEST:
      return {
        ...state,
        loadSummonerLoading: true,
      };

    case LOAD_SUMMONER_SUCCESS:
      return {
        ...state,
        summoner: action.data,
        loadSummonerLoading: false,
        loadSummonerDone: true,
        loadSummonerError: null,
      };
    
    case LOAD_SUMMONER_FAILURE:
      return {
        ...state,
        loadSummonerLoading: false,
        loadSummonerDone: false,
        loadSummonerError: action.data,
      };
    case LOAD_SUMMONER_DONE_CLEAR:
      return {
        ...state,
        loadSummonerDone: false,
      };
    default:
      return state;
  };
};

export default reducer;