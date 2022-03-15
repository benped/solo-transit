import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Stops() {
  const dispatch = useDispatch();
  const stops = useSelector((store) => store.stopReducer);
  const history = useHistory();
  const [stop, setStop] = useState("");
  const userPref = useSelector((store) => store.userPrefReducer);

  const setSelectedStop = (selectedStop) => {
    console.log("stop is", selectedStop);
    dispatch({ type: "SET_STOP_PREF", payload: selectedStop });
  };

  const backButton = () => {
    history.push("/info/directions");
  };

  const nextButton = () => {
    setSelectedStop(stops[stop]);
    history.push("/info/summary");
  };

  // place_code

  return (
    <>
      <p>Route: {userPref.route}</p>
      <p>Direction: {userPref.direction.direction_name}</p>
      
      <h1>Stops Drop Down</h1>

      <select value={stop} onChange={(event) => setStop(event.target.value)}>
        {stops.map((stop, i) => (
          <option id={i} value={i}>
            {stop.description}
          </option>
        ))}
      </select>
      <div>
        <button onClick={backButton}>Back</button>
        <button onClick={nextButton}>Next</button>
      </div>
    </>
  );
}

export default Stops;
