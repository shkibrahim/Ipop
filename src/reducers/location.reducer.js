import { combineReducers } from 'redux';
import { SET_LAST_KNOW_LOCATION } from '../actions/ActionConst';

const SetLocation = (state = {}, action) => {
  switch (action.type) {
    case SET_LAST_KNOW_LOCATION:
      return {
        data: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
    SetLocation,
});
