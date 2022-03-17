import axios from "axios";
import { put, takeLatest, select } from "redux-saga/effects";

import { useSelector } from "react-redux";
import userPrefReducer from "../reducers/userPref.reducer";

// worker Saga: will be fired on 'GET_SOONEST_ARRIVAL' actions
function* fetchArrivals(action) {
  console.log("inside fetcharrivals, payload is", action.payload);

  try {
    console.log("inside try fetchArrivals", action.payload);

    let allArrivals = [];
    for (let arrival of action.payload) {
      const response = yield axios.get(
        `https://svc.metrotransit.org/nextripv2/${arrival.stop_id}`
      );
      console.log("response from nextripv2 is", response);
      allArrivals.push({
        departure: response.data.departures[0].departure_text,
        preference_id: arrival.preference_id,
      });
    }
    // Pings METRO transit API

    console.log("allArrivals is", allArrivals);

    yield put({ type: "HOLD_ARRIVALS", payload: allArrivals });
  } catch (error) {
    console.log("Route arrivals get request failed", error);
  }
}

function* arrivalSaga() {
  yield takeLatest("GET_SOONEST_ARRIVAL", fetchArrivals);
}

export default arrivalSaga;
