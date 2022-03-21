import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import RouteItem from "../RouteItem/RouteItem";

import LinearProgress from '@mui/material/LinearProgress';

function RouteList({ routes }) {
  const { routeParam } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [URLrouteParam, setRouteParam] = useState()
  const userPref = useSelector((store) => store.userPrefReducer);
  let newBusArr = routes.slice(9, 36);

  const nextClicked = () => {
    history.push(`/info/directions/${URLrouteParam}`);
  };

  return (
    <>
      <LinearProgress variant="determinate" value={10} />
      <h1>Selected Route: {userPref.route}</h1>
      {newBusArr.map((route, index) => {
        return <RouteItem route={route} key={index} setRouteParam={setRouteParam}/>;
      })}
      <button onClick={nextClicked}>Next</button>
    </>
  );
}

export default RouteList;
