import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function Stops() {
  const dispatch = useDispatch();
  const stops = useSelector((store) => store.stopReducer);
  const history = useHistory();
  const [stop, setStop] = useState("");
  const [stopObj, setStopObj] = useState('');

  const userPref = useSelector((store) => store.userPrefReducer);
  const { routeParam, directionParam } = useParams();

  // const setSelectedStop = (selectedStop) => {
  //   console.log("stop is", selectedStop);
  //   dispatch({ type: "SET_STOP_PREF", payload: selectedStop });
  // };
  useEffect(() => {
    console.log("in direction useEffect", directionParam);
    // if (directionParam === 1 || directionParam === 0) {
      dispatch({
        type: "GET_STOPS",
        payload: { direction: directionParam, route: routeParam },
      });
    // }
    // console.log('stops are', stops);
  }, []);

  const backButton = () => {
    history.push(`/info/directions/${routeParam}/${directionParam}`);
  };

  const nextButton = () => {
    // setSelectedStop(stops[stop]);
    history.push(`/info/directions/stops/summary/${routeParam}/${directionParam}/${stopObj}`);
  };

  // place_code

  return (
    <>
      <p>Route: {routeParam}</p>
      <p>Direction: {directionParam}</p>

      <h1>Select Stop</h1>

      {stops.length > 0 ? (
        <select value={stop} onChange={(event) => {setStop(event.target.value);setStopObj(event.target.value) }}>
          {stops.map((stop, i) => (
          <option key={i} value={stop.place_code} >
            {stop.description}
          </option>
          ))}
        </select>
      ) : (
        <span></span>
      )}
      <div>
        <button onClick={backButton}>Back</button>
        <button onClick={nextButton}>Next</button>
      </div>
    </>
  );
}

export default Stops;
