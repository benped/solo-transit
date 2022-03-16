import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function UserPref({ route }) {
  const dispatch = useDispatch();
  const arrivals = useSelector((store) => store.arrivalsReducer);

  console.log("arrivals are", arrivals);

  useEffect(() => {
    // Trying out something new, doing a loop in the saga to get all arrivals before sending to reducer
    // dispatch({ type: 'GET_SOONEST_ARRIVAL', payload:{stop_id:route.stop_id,index:route.preference_id}});
    dispatch({ type: "GET_SOONEST_ARRIVAL", payload: route });
    

  }, []);

  let departure = "";

  const onLoad = (arrivals) => {

    for (let i = 0; i < arrivals.length; i++) {
      console.log("inside hold arrivals for loop");
      
      if (arrivals[i].preference_id === route.preference_id) {
        console.log("inside if statement for hold arrivals reducer");
        
        departure = arrivals[i].departure;
      }
    }
  }

  return (
    <>
      <div>
        <h2>{route.route_id}</h2>
        <h3>{route.description}</h3>
        <h3></h3>
        <p>{departure}</p>
      </div>
    </>
  );
}

export default UserPref;
