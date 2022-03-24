import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";



// worker Saga: will be fired on "FETCH_USER_PREF" actions
function* getPref() {


  try {
    const response = yield axios.get("/api/preference/");

    console.log("response from server is", response);
    // yield axios.post("/api/preference/time", response.data);

    yield put({type: "SET_USER_ROUTES", payload: response.data})

  } catch (error) {
    console.log("post request failed", error);
  }
}

function* putNotify(payload) {
    try {
        const response =yield axios.put("/api/preference",payload);
        console.log('Response is', response);
        
    } catch (error) {
        console.log('Error on put', error);
        
    }
}

function* deletePref(payload) {
  try {
    console.log('Delete pref payload is', payload.payload);
    
    const response = yield axios.delete(`/api/preference/${payload.payload}`)
    console.log('Response is', response);
    yield put({type: "FETCH_USER_PREF"})
  } catch {
    console.log('error on delete pref');
    
  }
}

function* userPrefSaga() {
  yield takeLatest("FETCH_USER_PREF", getPref);
  yield takeLatest("UPDATE_NOTIFICATIONS", putNotify);
  yield takeLatest("DELETE_ROUTE_PREF", deletePref);
}

export default userPrefSaga;
