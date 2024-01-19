import { combineReducers } from 'redux';
import { SET_COMMENTCNT } from '../actions/ActionConst';

const commentCnt = (state = {}, action) => {
  switch (action.type) {
    case SET_COMMENTCNT:
      return {
        data: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
    commentCnt,
});
