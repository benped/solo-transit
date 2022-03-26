import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* textMe(action) {
  console.log("INside textMe SAGA", action.payload.route);
  try {
    let response = yield axios.get(
      `https://svc.metrotransit.org/nextripv2/${action.payload.route.route_id}/${action.payload.route.direction_id}/${action.payload.route.place_code}`
    );
    console.log("next trip response is", response.data.departures);
    let textData = response.data.departures[0];

    let text = `The next ${action.payload.route.route_label} arrives at ${action.payload.route.description} heading toward ${textData.description} in ${textData.departure_text}`;

    console.log("text is", { text: text, phone: Number(action.payload.phone) });

    yield axios.post("/api/text", {
      text: text,
      phone: Number(action.payload.phone),
    });
  } catch {
    console.log("textMe failed", error);
  }
}

function* notificationSaga() {
  yield takeLatest("TEXT_ME", textMe);
}

export default notificationSaga;
