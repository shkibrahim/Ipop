import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import { LOGIN_FAILED, LOGIN_SUCESS } from '../actions/ActionConst';
import { AsyncName } from '../helper/AsyncName';

const authData = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCESS:
            return {
                isLoggedIn: true,
                data: action.payload
            }

        case LOGIN_FAILED:
            AsyncStorage.removeItem(AsyncName.instaToken)
            AsyncStorage.removeItem(AsyncName.instaUserName)
            // AsyncStorage.removeItem(AsyncName.deviceToken)
            // AsyncStorage.clear();
            return {
                isLoggedIn: false,
            }


        default:
            return state;
    }
}

const loginUser = (state = { isLoading: false, }, action) => {
    switch (action.type) {

        case "LOGIN_USER_LOADING":
            return {
                isLoading: true,
            }

        case "LOGIN_USER_SUCCESS":
            return {
                isLoading: false,
            }

        case "LOGIN_USER_FAIL":
            return {
                isLoading: false,
            }


        default:
            return state;
    }
}

export default combineReducers({
    loginUser,
    authData
}); 