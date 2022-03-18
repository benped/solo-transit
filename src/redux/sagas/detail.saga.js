import axios from "axios";
import { put, takeLatest, select } from "redux-saga/effects";

import { useSelector } from "react-redux";
import userPrefReducer from "../reducers/userPref.reducer";

// worker Saga: will be fired on 'GET_SOONEST_ARRIVAL' actions
function* fetchDetail(action) {
  console.log("inside fetchDetail, payload is", action.payload);

  try {
    const detail = yield axios.get(`/api/preference/details/${action.payload}`);
    console.log("detail response is", detail.data[0]);
    yield put({ type: "HOLD_DETAIL", payload: detail.data[0] });

    const response = yield axios.get(
      `https://svc.metrotransit.org/nextripv2/${detail.data[0].stop_id}`
    );

    const departure = response.data.departures[0].departure_text;
    yield put({ type: "HOLD_ARRIVAL_DETAIL", payload: { arrival : departure }});

  } catch (error) {
    console.log("details get request failed", error);
  }
}

function* detailSaga() {
  yield takeLatest("GET_DETAIL", fetchDetail);
}

export default detailSaga;
