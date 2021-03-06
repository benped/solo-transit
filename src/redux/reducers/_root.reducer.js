import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import routeReducer from './route.reducer';
import userPrefReducer from './userPref.reducer';
import directionReducer from './direction.reducer';
import stopReducer from './stop.reducer';
import userRoutesReducer from './userRoutes.reducer';
import detailReducer from './detail.reducer';
import arrivalReducer from './arrival.reducer';
import summaryReducer from './summary.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  routeReducer, 
  userPrefReducer,
  directionReducer,
  stopReducer,
  userRoutesReducer,
  detailReducer,
  arrivalReducer,
  summaryReducer,
});

export default rootReducer;
