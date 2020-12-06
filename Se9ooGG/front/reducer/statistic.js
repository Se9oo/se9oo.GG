export const initialState = {
  summoner: {},
};

// 사용자 정보
export const LOAD_SUMMONER_REQUEST = 'LOAD_SUMMONER_REQUEST';
export const LOAD_SUMMONER_SUCCESS = 'LOAD_SUMMONER_SUCCESS';
export const LOAD_SUMMONER_FAILURE = 'LOAD_SUMMONER_FAILURE';

export const loadSummonerRequestAction = (data) => {
  return {
    type: LOAD_SUMMONER_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUMMONER_REQUEST:
      return {
        ...state,
      };

    case LOAD_SUMMONER_SUCCESS:
      return {
        ...state,
        summoner: action.data,
      };
    
    case LOAD_SUMMONER_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  };
};

export default reducer;