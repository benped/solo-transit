import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function Stops() {
  const dispatch = useDispatch();
  const userPref = useSelector((store) => store.userPrefReducer);
  const history = useHistory();

  const { route, direction, stop } = userPref;
  const { routeParam, directionParam, placeCode } = useParams();

  const backButton = () => {
    history.push("/info/stops");
  };

  const nextButton = () => {
    if (notify.value == 0) {
      alert("Fill out time!");
      return;
    }

    console.log("inside confirm", notify.value);
    dispatch({
      type: "CONFIRM_NEW_PREF",
      payload: {
        route_id: route,
        // route_label: route.route_label,
        direction_id: direction.direction_id,
        direction_name: direction.direction_name,
        place_code: stop.place_code,
        description: stop.description,
        time: notify.value,
      },
    });
    history.push("/");
  };

  // place_code

  return (
    <>
      <h1>Summary</h1>

      <p>Route: {userPref.route}</p>
      <p>Direction: {userPref.direction.direction_name}</p>
      <p>Stop: {userPref.stop.description}</p>

      <label for="appt">When do you want to be notified?</label>
      <input type="time" id="notify" name="notify" defaultValue={0} />

      <div>
        <button onClick={backButton}>Back</button>
        <button onClick={nextButton}>Next</button>
      </div>
    </>
  );
}

export default Stops;
