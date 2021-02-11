export const initialState = {
  summoner: {},
  inGame: {},
  loadSummonerLoading: false,
  loadSummonerDone: false,
  loadSummonerError: null,
  loadSummonerInGameLoading: false,
  loadSummonerInGameDone: false,
  loadSummonerInGameError: null,
};

// 사용자 정보
export const LOAD_SUMMONER_REQUEST = 'LOAD_SUMMONER_REQUEST';
export const LOAD_SUMMONER_SUCCESS = 'LOAD_SUMMONER_SUCCESS';
export const LOAD_SUMMONER_FAILURE = 'LOAD_SUMMONER_FAILURE';
export const LOAD_SUMMONER_DONE_CLEAR = 'LOAD_SUMMONER_DONE_CLEAR';
export const LOAD_SUMMONER_ERROR_CLEAR = 'LOAD_SUMMONER_ERROR_CLEAR';
export const LOAD_SUMMONER_INGAME_REQUEST = 'LOAD_SUMMONER_INGAME_REQUEST';
export const LOAD_SUMMONER_INGAME_SUCCESS = 'LOAD_SUMMONER_INGAME_SUCCESS';
export const LOAD_SUMMONER_INGAME_FAILURE = 'LOAD_SUMMONER_INGAME_FAILURE';
export const LOAD_SUMMONER_INGAME_ERROR_CLEAR = 'LOAD_SUMMONER_INGAME_ERROR_CLEAR';

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
};

export const loadSummonerErrorClearAction = () => {
  return {
    type: LOAD_SUMMONER_ERROR_CLEAR,
  }
};

export const loadSummonerInGameRequestAction = (data) => {
  return {
    type: LOAD_SUMMONER_INGAME_REQUEST,
    data
  }
};

export const loadSummonerInGameErrorClearAction = () => {
  return {
    type: LOAD_SUMMONER_INGAME_ERROR_CLEAR,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUMMONER_REQUEST:
      return {
        ...state,
        loadSummonerLoading: true,
        loadSummonerDone: false,
        loadSummonerError: null,
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
    case LOAD_SUMMONER_INGAME_REQUEST:
      return {
        ...state,
        loadSummonerInGameLoading: true,
        loadSummonerInGameDone: false,
        loadSummonerInGameError: null,
      };
    case LOAD_SUMMONER_INGAME_SUCCESS:
      return {
        ...state,
        loadSummonerInGameLoading: false,
        loadSummonerInGameDone: action.data,
        loadSummonerInGameError: null,
      };
    case LOAD_SUMMONER_INGAME_FAILURE:
      return {
        ...state,
        loadSummonerInGameLoading: false,
        loadSummonerInGameDone: false,
        loadSummonerInGameError: action.data,
      }
    case LOAD_SUMMONER_DONE_CLEAR:
      return {
        ...state,
        loadSummonerDone: false,
      };
    case LOAD_SUMMONER_ERROR_CLEAR:
      return {
        ...state,
        loadSummonerError: null,
      }
    case LOAD_SUMMONER_INGAME_ERROR_CLEAR:
      return {
        ...state,
        loadSummonerInGameError: null,
      }
    default:
      return state;
  };
};

export default reducer;