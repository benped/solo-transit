import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import RouteItem from "../RouteItem/RouteItem";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const routes = useSelector((store) => store.routeReducer);

  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_ROUTES" });
  }, []);

  console.log(routes[0]);
  // array 9 - 45
  //  let busArr = routes.data;
  let newBusArr = routes.slice(9, 36);
  console.log(newBusArr);

  return (
    <div className="container">
      <p>Info Page</p>

      {newBusArr.map((route, index) => {
        return <RouteItem route={route} key={index} />;
      })}

      <button>SetRoute</button>
    </div>
  );
}

export default InfoPage;
