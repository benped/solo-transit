import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
const { default: axios } = require("axios");

function UserPref({ route }) {
  const dispatch = useDispatch();
  const [arrival, setArrival] = useState("");
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  let departure = "";

  // onLoad this makes a get request to grab the next arrival from the metro transit API
  const onLoad = async () => {
    try {
      let response = await axios.get(
        `https://svc.metrotransit.org/nextripv2/${route.stop_id}`
      );
      console.log(response);
      departure = response.data.departures[0].departure_text;
      console.log("Inside user pref departure data", departure);
      setArrival(departure);
    } catch (error) {
      console.log("error on axios get",(error));
    }
  };

  const UserPrefDetail = () => {
    history.push(`/detail/${route.preference_id}`); // back to list
  }

  return (
    <>
      <div className="arrivals" onClick={UserPrefDetail}>
        <h2>{route.route_id}</h2>
        <p>Arriving: {arrival}</p>
        <h3>{route.description}</h3>
        <h3>{route.direction_name}</h3>
        <h3></h3>
      </div>
    </>
  );
}

export default UserPref;
