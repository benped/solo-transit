import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import RouteItem from "../RouteItem/RouteItem";
import Directions from "../Directions/Directions";


function InfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const routes = useSelector((store) => store.routeReducer);
  const selectedRoute = useSelector((store) => store.userPrefReducer);
  const direction = useSelector((store) => store.directionReducer);

  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_ROUTES" });
  }, []);

  let newBusArr = routes.slice(9, 36);
  // console.log(newBusArr);

  const getDirection = () => {
    console.log(selectedRoute);
    dispatch({ type: "GET_DIRECTION", payload: selectedRoute.route });
    console.log(direction);
  };

  return (
    <div className="container">
      <p>Info Page</p>
      <h1>Selected Route: {selectedRoute.route}</h1>
      {newBusArr.map((route, index) => {
        return <RouteItem route={route} key={index} />;
      })}

      <button onClick={getDirection}>Set Route</button>

     {direction.length > 0 ? <div>

      <h1>Direction</h1>
      {/* {direction.map((dir, i) => {
        <div> */}
          <Directions/>
        {/* </div>;
      })} */}
      </div>
      : <span> </span>}
    </div>
  );
}

export default InfoPage;
