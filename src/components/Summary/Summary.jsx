import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function Summary() {
  const dispatch = useDispatch();
  // const userPref = useSelector((store) => store.userPrefReducer);
  const summary = useSelector((store) => store.summaryReducer);

  const history = useHistory();

  // const { route, direction, stop } = userPref;
  // const {
  //   route_id,
  //   route_label,
  //   direction_id,
  //   direction_name,
  //   place_code,
  //   description,
  // } = summary;
  // const { routeParam, directionParam, placeCode } = useParams();

  // useEffect(() => {
  //   dispatch({
  //     type: "GET_ALL_DATA",
  //     payload: {
  //       direction: directionParam,
  //       route: routeParam,
  //       placeCode: placeCode,
  //     },
  //   });
  // }, []);

  const backButton = () => {
    history.push("/info/stops");
  };

  const nextButton = () => {
    if (notify.value == 0) {
      alert("Fill out time!");
      return;
    }

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
    dispatch({ type: "FETCH_USER_PREF" });
    history.push("/");
  };

  // place_code

  return (
    <>
      <label >When do you want to be notified?</label>
      <input type="time" id="notify" name="notify" defaultValue={0} />

      {/* <div>
        <button onClick={backButton}>Back</button>
        <button onClick={nextButton}>Next</button>
      </div> */}
    </>
  );
}

export default Summary;
