import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
        variant="outlined"
        
        
        sx={{ m: .5 }}
        onClick={(event) => {selectRoute(event);}}
        value={route.route_id}
      >
        {route.route_id > 886 ? route.route_label : route.route_id}
      </Button>
    </>
  );
}

export default RouteItem;
