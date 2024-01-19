import { combineReducers } from "redux";
import {
    ADD_NEW_LASTTAB_VISITED,
} from "../actions/ActionConst";

const lastTabVisited = (state = {}, action) => {
  switch (action.type) {
  
    case ADD_NEW_LASTTAB_VISITED:
      if (state?.popup?.length > 0) {
          const recentVisitedEvent = [...state.popup];
          for (let index = 0; index < recentVisitedEvent.length; index++) {
              const element = recentVisitedEvent[index];
              if (element.eventId === action.payload.eventId) {
                  recentVisitedEvent.splice(index)
              }
          }
          recentVisitedEvent.push(action.payload);
          return {
              popup: recentVisitedEvent,
          };
      } else {
          return {
              popup: [action.payload],
          };
      }
    default:
      return state;
  }
};

export default combineReducers({
    lastTabVisited,
});
