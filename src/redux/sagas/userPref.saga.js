import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";



// worker Saga: will be fired on "FETCH_USER_PREF" actions
function* getPref() {


  try {
    const response = yield axios.get("/api/preference/");

    console.log("response from server is", response);
    yield axios.post("/api/preference/time", response.data);

    // yield put({type: "SET_USER_ROUTES", payload: response.data})

  } catch (error) {
    console.log("post request failed", error);
  }
}

function* userPrefSaga() {
  yield takeLatest("FETCH_USER_PREF", getPref);
}

export default userPrefSaga;