import { combineReducers } from 'redux';
import { SET_REFRESHDATA } from '../actions/ActionConst';

const backData = (state = {}, action) => {
  switch (action.type) {
    case SET_REFRESHDATA:
      return {
        data: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
    backData,
});
