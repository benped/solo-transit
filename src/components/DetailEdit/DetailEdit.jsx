import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function DetailEdit({ setEdit }) {
  const detail = useSelector((store) => store.detailReducer);
  const arrival = useSelector((store) => store.arrivalReducer);
  const [routeList, setRouteList] = useState([]);
  const [route, setRoute] = useState(detail.route_id);
  const [directionList, setDirectionList] = useState([]);
  const [direction, setDirection] = useState(detail.direction_name,detail.direction_id);
  const [directionID, setDirectionID] = useState();
  const [stopList, setStopList] = useState([]);
  const [stop, setStop] = useState(detail.description);

  useEffect(() => {
    getRoutes();
  }, []);
  console.log("Detail is", detail);
  console.log("DirectionList is", directionList);
  console.log("Direction is ID", directionID);
  console.log("Direction is", direction);

  const getRoutes = async () => {
    try {
      const response = await axios.get(
        "https://svc.metrotransit.org/nextripv2/routes"
      );
      console.log(response.data);
      setRouteList(response.data);
      getDirections();
    } catch {
      console.log("error on axios get");
    }
  };

  const getDirections = async () => {
    try {
      const response = await axios.get(
        `https://svc.metrotransit.org/nextripv2/directions/${route}`
      );
      console.log(response.data);
      setDirectionList(response.data);
    } catch {
      console.log("error on directions get");
    }
  };

  const getStops = () => {
    try {
      console.log("direction id is", direction);
      const last = direction.charAt(direction.length - 1);
      console.log("last is", last);
      const response = axios.get(
        `https://svc.metrotransit.org/nextripv2/stops/${route}/${last}`
      );
      console.log(response.data);
      setStopList(response.data);
    } catch {
      console.log("error on stops get");
    }
  };

  const directionChange = (event) => {
    // setDirectionID(event.target.id);
    setDirection(event.target.value);
    getStops();
    setStop("");
  };

  return (
    <div>
      <h1> Edit </h1>
      {/* <input  value={} /> */}
      <select
        value={route}
        onChange={(event) => {
          setRoute(event.target.value);
          setDirection("");
          setStop("");
          getDirections();
        }}
      >
        {routeList.length > 0 &&
          routeList.map((route, i) => (
            <option id={i} value={route.route_id}>
              {route.route_label}
            </option>
          ))}
      </select>

      {/* DIRECTION REDUCER AND DROPDOWN */}
      <select
        value={direction}
        id={directionID}
        onChange={(event) => {
          directionChange(event);
          console.log("on click directionID", event.target.key);
        }}
      >
        {directionList.length > 0 &&
          directionList.map((dir, i) => (
            <option id={i} value={[dir.direction_name, dir.direction_id]}>
              {dir.direction_name}
            </option>
          ))}
      </select>

      {/* STOPSSSSSSS */}

      <select
        value={stop}
        onChange={(event) => {
          setStop(event.target.value);
        }}
      >
        {stopList.length > 0 &&
          stopList.map((place, i) => (
            <option id={place.place_code} value={stop.description}>
              {stop.description}
            </option>
          ))}
      </select>

      <p>Notify At: {detail.time}</p>
      <button onClick={() => setEdit(false)}>Back</button>
    </div>
  );
}

export default DetailEdit;
