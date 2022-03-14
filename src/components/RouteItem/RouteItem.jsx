import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function RouteItem({ route, i }) {
    const dispatch = useDispatch();

    const selectRoute = () => {
        // dispatch to temporarily set route. Confirm route will trigger the next call
        dispatch({type:'SET_ROUTE',payload:route.route_id});
        
    }

  return (
    <>
      <button onClick={selectRoute} value={route.route_id}>{route.route_label}</button>
    </>
  );
}

export default RouteItem;
