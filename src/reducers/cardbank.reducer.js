import { combineReducers } from 'redux';
import { DESTROY_SESSION, SET_CARDBANK_DATA } from '../actions/ActionConst';

const cardBankData = (state = {}, action) => {
    switch (action.type) {
        case SET_CARDBANK_DATA:
            return {
                data: action.payload
            }

        case DESTROY_SESSION:
            return {
                data: null
            }

        default:
            return state;
    }
}

export default combineReducers({
    cardBankData
}); 