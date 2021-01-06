import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';
import statistic from './statistic';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      //console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
        statistic,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;