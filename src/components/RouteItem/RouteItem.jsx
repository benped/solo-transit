import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

function RouteItem({ route, i, setRouteParam, setRouteLabel, setNext }) {
  const dispatch = useDispatch();

  const selectRoute = (event) => {
    // dispatch to temporarily set route. Confirm route will trigger the next call
    dispatch({ type: "GET_DIRECTION", payload: route.route_id });
    setNext(true);
    // dispatch({type:"SEND_ROUTE1", payloud:route});
    // setRouteParam(event.target.value);
    setRouteLabel(route.route_label);
    setRouteParam(route.route_id);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        sx={{ m: 1 }}
        onClick={(event) => selectRoute(event)}
        value={route.route_id}
      >
        {route.route_label}
      </Button>
    </>
  );
}

export default RouteItem;
