import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import RouteItem from "../RouteItem/RouteItem";

function RouteList({ routes, setRouteLabel, setRouteParam, setNext }) {
  // const dispatch = useDispatch();
  // const history = useHistory();
  
  // const userPref = useSelector((store) => store.userPrefReducer);
  let newBusArr = routes.slice(0, 36);
  
  // const nextClicked = () => {
  //   history.push(`/info/directions/${URLrouteParam}`);
  // };

  return (
    <>
      {/* <LinearProgress variant="determinate" value={10} /> */}
      {/* <h1>Selected Route: {userPref.route}</h1> */}
      {newBusArr.map((route, index) => {
        return <RouteItem route={route} key={index} setNext={setNext} setRouteParam={setRouteParam} setRouteLabel={setRouteLabel}/>;
      })}
      {/* <button onClick={nextClicked}>Next</button> */}
    </>
  );
}

export default RouteList;
