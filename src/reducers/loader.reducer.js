import { combineReducers } from 'redux';
import { SET_LOADING_TRUE, SET_LOADING_FALSE } from '../actions/ActionConst';

const setLoading = (state = { isLoading: false }, action) => {
    switch (action.type) {
        case SET_LOADING_TRUE:
            return {
                isLoading: true
            }

        case SET_LOADING_FALSE:
            return {
                isLoading: false
            }

        default:
            return state;
    }
}

export default combineReducers({
    setLoading
}); 