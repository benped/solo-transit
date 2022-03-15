import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "GET_STOPS actions
function* postPref(action) {
  try {
    console.log("action.payload is", action.payload);

    const response = yield axios.post('/api/preference/', action.payload)

    // now that the session has given us a route object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
  
    console.log('response from server is', response);
    
  } catch (error) {
    console.log("post request failed", error);
  }
}

function* confirmSaga() {
  yield takeLatest("CONFIRM_NEW_PREF", postPref);
}

export default confirmSaga;
