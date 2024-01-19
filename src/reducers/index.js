import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './auth.reducer';
import loaderReducer from './loader.reducer';
import cardBankReducer from './cardbank.reducer';
import profileReducer from './user.reducer';
import badgeReducer from './badgeCount.reducer';
import collaboratorReducer from './collaborator.reducer';
import commentReducer from './comment.reducer';
import refreshReducer from './backData.reducer';
import recentpopupReducer from './recentpopup.reducer';
import lastVisitedPopupReducer from './lastVisited.reducer'
import locationReducer from './location.reducer'
import printerReducer from './printer.reducer';

 const reducers = {
  authReducer,
  loaderReducer,
  cardBankReducer,
  profileReducer,
  badgeReducer,
  collaboratorReducer,
  commentReducer,
  refreshReducer,
  recentpopupReducer,
  lastVisitedPopupReducer,
  locationReducer,
  printerReducer,
  form: formReducer,
};

const appReducer = combineReducers(reducers);

export default appReducer;
