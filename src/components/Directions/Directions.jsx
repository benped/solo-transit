import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import LinearProgress from '@mui/material/LinearProgress';

function Directions() {
  const dispatch = useDispatch();
  const direction = useSelector((store) => store.directionReducer);
  const route = useSelector((store) => store.userPrefReducer.route);
  const history = useHistory();
  const userPref = useSelector((store) => store.userPrefReducer);
  const { routeParam } = useParams();
  const [localDirection, setLocalDirection] = useState();
  const [directionObj, setDirectionObj] = useState({});

  // console.log("Inside directions: directions are:", direction);
  console.log("RouteParam is", routeParam);

  useEffect(() => {
    console.log("in direction useEffect");
    dispatch({ type: "GET_DIRECTION", payload: routeParam });
  }, []);

  // console.log("user pref is ", userPref);
  // const getStops = (id) => {
  //   console.log("inside getStops dirction is:", direction[id]);
  //   dispatch({
  //     type: "GET_STOPS",
  //     payload: { direction: direction[id], route: route},
  //   });
  // };

  const backButton = () => {
    history.push(`/info/${routeParam}`);
  };

  const nextButton = () => {
    console.log(directionObj.direction_id);
    history.push(`/info/directions/stops/${routeParam}/${directionObj.direction_id}`)
  };

  return (
    <>
    <LinearProgress variant="determinate" value={40} />
      <p>Route: {userPref.route}</p>

      <h1>Direction: {localDirection}</h1>

      {direction.length > 0 ? (
        <div>
          <button
            onClick={(event) => {
              setLocalDirection(event.target.value);
              setDirectionObj(direction[0]);
            }}
            // id={direction[0].direction_id}
            value={direction[0].direction_name}
          >
            {direction[0].direction_name}
          </button>
          <button
            onClick={(event) => {
              setLocalDirection(event.target.value);
              setDirectionObj(direction[1]);
            }}
            // id={direction[1].direction_id}
            value={direction[1].direction_name}
          >
            {direction[1].direction_name}
          </button>
        </div>
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

export default Directions;
