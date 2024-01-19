import { combineReducers } from "redux";
import {
  ADD_RECENT_POPUPVISITS,
  MEDIA_ADDED,
  REMOVE_RECENT_POPUPVISITS,
  SET_RECENT_POPUPVISITS,
} from "../actions/ActionConst";

const recentPopup = (state = {}, action) => {
  switch (action.type) {
    case SET_RECENT_POPUPVISITS:
      return {
        data: action.payload,
      };

    case ADD_RECENT_POPUPVISITS:
      if (state?.data?.length > 0) {
        const recentEvents = [...state.data];
        for (let index = 0; index < recentEvents.length; index++) {
          const element = recentEvents[index];
          if (element.eventId === action.payload.eventId) {
            return {
              data: recentEvents,
            };
          }
        }
        recentEvents.push(action.payload);
        return {
          data: recentEvents,
        };
      } else {
        return {
          data: [action.payload],
        };
      }

    case REMOVE_RECENT_POPUPVISITS:
      if (state?.data?.length > 0) {
        const recentEvents = [...state.data];
        const eventId = action.payload;
        const newEvents = recentEvents.filter(
          (event) => event.eventId !== eventId
        );
        return {
          data: newEvents,
        };
      } else {
        return {
          data: [action.payload],
        };
      }

    case MEDIA_ADDED:
      if (state?.data?.length > 0) {
        console.log("MEDIA_ADDED",action.payload)
        const recentEvents = [...state.data];
        const finalRecentEvents = [...state.data];
        for (let index = 0; index < recentEvents.length; index++) {
          const element = recentEvents[index];
          for (let index1 = 0; index1 < action.payload.length; index1++) {
            const element1 = action.payload[index1];
            if (element.eventId === element1.eventId) {
              let addedMediaElement = { ...element };
              finalRecentEvents.splice(index, 1);
              if (element1.hasRecentMediaPost) {
                addedMediaElement.hasRecentMediaPost = true;
                finalRecentEvents.splice(index, 0, addedMediaElement);
              } else {
                addedMediaElement.hasRecentMediaPost = false;
                finalRecentEvents.push(addedMediaElement);
              }
            }
          }
        }
        return {
          data: [...finalRecentEvents],
        };
      }
    default:
      return state;
  }
};

export default combineReducers({
  recentPopup,
});
