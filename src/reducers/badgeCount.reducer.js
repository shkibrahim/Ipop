import { combineReducers } from 'redux';
import { BADGE_COUNT } from '../actions/ActionConst';

const badgeData = (state = {}, action) => {
  switch (action.type) {
    case BADGE_COUNT:
      return {
        data: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
  badgeData,
});
