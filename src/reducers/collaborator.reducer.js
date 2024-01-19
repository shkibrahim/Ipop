import { combineReducers } from 'redux';
import { SET_COLLABORATOR, GET_COLLABORATOR_LIST, NOTIFICATION_CENTER, USER_COLLABORATION_DETAILS } from '../actions/ActionConst';

const initialState = {
    collaboratorList: [],
    data: [],
    notificationList: [],
    userColloborationDetails: null
};

const collaboratorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COLLABORATOR:
            console.log('collaborator', action.payload)
            return {
                ...state, data: action.payload,
            };

        case GET_COLLABORATOR_LIST:
            let filteredKey = action.payload.map(item => { return item['role'] })
            let dup = [...new Set(filteredKey)]
            let newResult = dup.map(item => {
                const eachList = action.payload.filter(each => {
                    if (each['role'] === item)
                        return each
                })
                return { title: item, data: eachList }
            })
            return {
                ...state, collaboratorList: newResult,
            };

        case NOTIFICATION_CENTER:
            return {
                ...state, notificationList: action.payload,
            };

        case USER_COLLABORATION_DETAILS:
            return {
                ...state, userColloborationDetails: action.payload,
            };

        default:
            return state;
    }
};

export default collaboratorReducer;
