import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function RouteItem({ route, i, setRouteParam, setRouteLabel }) {
    const dispatch = useDispatch();

    const selectRoute = (event) => {
        // dispatch to temporarily set route. Confirm route will trigger the next call
        dispatch({type:"GET_DIRECTION",payload:route.route_id});
        // dispatch({type:"SEND_ROUTE1", payloud:route});
        // setRouteParam(event.target.value);
        setRouteLabel(route.route_label);
        setRouteParam(route.route_id);
    }

  return (
    <>
      <button onClick={(event) => selectRoute(event)} value={route.route_id}>{route.route_label}</button>
    </>
  );
}

export default RouteItem;
