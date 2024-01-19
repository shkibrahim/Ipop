import { combineReducers } from 'redux';
import { STORE_USER_DATA } from '../actions/ActionConst';


const profileUser = (state = {}, action) => {
    switch (action.type) {
        case STORE_USER_DATA:
            return {
                profileData: action.payload
            }

        default:
            return state;
    }
}

export default combineReducers({
    profileUser
}); 