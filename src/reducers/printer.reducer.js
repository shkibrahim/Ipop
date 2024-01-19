import { combineReducers } from 'redux';
import { REMOVE_PRINTER_TYPE, SET_CONNECTED_PRINTER_TYPE } from '../actions/ActionConst';

const setPrinter = (state = {}, action) => {
  switch (action.type) {
    case SET_CONNECTED_PRINTER_TYPE:
      return {
        printerType: action.payload,
      };
    case REMOVE_PRINTER_TYPE:
        return {
          printerType: undefined
        }
    default:
      return state;
  }
};

export default combineReducers({
  setPrinter,
});
