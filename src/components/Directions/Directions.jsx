import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

function Directions({setDirectionLabel, directionLabel, setDirectionObj, routeParam, setNext}) {
  const dispatch = useDispatch();
  const direction = useSelector((store) => store.directionReducer);
  // const route = useSelector((store) => store.userPrefReducer.route);
  // const history = useHistory();
  const userPref = useSelector((store) => store.userPrefReducer);
  // const { routeParam } = useParams();
  const [localDirection, setLocalDirection] = useState();
  // const [directionObj, setDirectionObj] = useState({});

  // console.log("Inside directions: directions are:", direction);
  // console.log("RouteParam is", routeParam);

  useEffect(() => {
    console.log("in direction useEffect, route Param is", routeParam);
    console.log("in direction useEffect, userPref Route is", userPref.route);
    if (directionLabel === "Direction" ){
      setNext(false);}

  }, []);



  const directionClicked = async (direction_id) => {
    
   await dispatch({
      type: "GET_STOPS",
      payload: { direction: direction_id, route: routeParam },
    });
    setNext(true);
  }

  return (
    <>

      {direction.length > 0 ? (
        <div>
          <Stack spacing={2} m={2}>

          <Button
            onClick={(event) => {
              setLocalDirection(event.target.value);
              setDirectionObj(direction[0]);
              setDirectionLabel(event.target.value);
              directionClicked(0);
            }}
            // id={direction[0].direction_id}
            value={direction[0].direction_name}
            >
            {direction[0].direction_name}
          </Button>
          <Button
            onClick={(event) => {
              setLocalDirection(event.target.value);
              setDirectionObj(direction[1]);
              setDirectionLabel(event.target.value);
              directionClicked(1);
            }}
            // id={direction[1].direction_id}
            value={direction[1].direction_name}
            >
            {direction[1].direction_name}
          </Button>
            </Stack>
        </div>
      ) : (
        <span></span>
      )}
      {/* <div>
        <button onClick={backButton}>Back</button>
        <button onClick={nextButton}>Next</button>
      </div> */}
    </>
  );
}

export default Directions;
