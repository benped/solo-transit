import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function UserPref({ route, i }) {
    const dispatch = useDispatch();


    // const { description, direction_name, place_code, route_id, stop_id, time } = route;

    // useEffect(() => {
    //   dispatch({ type: 'GET_SOONEST_ARRIVAL', payload:{stop_id:route.stop_id,index:i }});
    // }, []);

  return (
    <>
      <div>
        <h2>{route.route_id}</h2>
        {/* <h3>{description}</h3> */}
      </div>
    </>
  );
}

export default UserPref;
