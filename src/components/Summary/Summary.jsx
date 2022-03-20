import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function Stops() {
  const dispatch = useDispatch();
  // const userPref = useSelector((store) => store.userPrefReducer);
  const summary = useSelector((store) => store.summaryReducer);

  const history = useHistory();

  // const { route, direction, stop } = userPref;
  const { route_id, route_label, direction_id, direction_name, place_code, description} = summary; 
  const { routeParam, directionParam, placeCode } = useParams();

  useEffect(() => {
    dispatch({
      type: "GET_ALL_DATA",
      payload: {
        direction: directionParam,
        route: routeParam,
        placeCode: placeCode,
      },
    });
  }, []);

  const backButton = () => {
    history.push("/info/stops");
  };

  const nextButton = () => {
    if (notify.value == 0) {
      alert("Fill out time!");
      return;
    }
// console.log('Route is', route);
// console.log('direction is', direction);
// console.log('Stop is', stop);
// console.log('user pref is', userPref);
console.log(summary);
    console.log("inside confirm", notify.value);
    dispatch({
      type: "CONFIRM_NEW_PREF",
      payload: {
        route_id: route_id,
        route_label: route_label,
        direction_id: direction_id,
        direction_name: direction_name,
        place_code: place_code,
        description: description,
        time: notify.value,
      },
    });
    history.push("/");
  };

  // place_code

  return (
    <>
      <h1>Summary</h1>

      <p>{summary.route_label}</p>
      <p>Direction: {summary.direction_name}</p>
      <p>Stop: {summary.description}</p>

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
