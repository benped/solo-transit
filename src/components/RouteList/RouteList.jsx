import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import RouteItem from "../RouteItem/RouteItem";

function RouteList({ routes }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userPref = useSelector((store) => store.userPrefReducer);
  let newBusArr = routes.slice(9, 36);

  const nextClicked = () => {
    history.push("/info/directions");
  };

  return (
    <>

      <h1>Selected Route: {userPref.route}</h1>
      {newBusArr.map((route, index) => {
        return <RouteItem route={route} key={index} />;
      })}
      <button onClick={nextClicked}>Next</button>
    </>
  );
}

export default RouteList;
