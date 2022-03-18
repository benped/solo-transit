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
  const [direction, setDirection] = useState(detail.direction_name);

  const [directionID, setDirectionID] = useState(detail.direction_id);

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
      console.log("firing getDirections");
      console.log(response.data);
      setDirectionList(response.data);
      getStops();
    } catch {
      console.log("error on directions get");
    }
  };

  const getStops = async () => {
    try {
      await console.log("direction id is", direction);

      const response = await axios.get(
        `https://svc.metrotransit.org/nextripv2/stops/${route}/${directionID}`
      );
      console.log(response);
      setStopList(response.data);
      console.log("stop list is", stopList);
    } catch {
      console.log("error on stops get");
    }
  };

  const searchDirection = async (id) => {
    try {
      console.log("id in search direction is", id);
      console.log("directionList is", directionList);
      const directionObj = directionList.find(
        (element) => element.direction_id == id
      );
      console.log("found is", directionObj);
      //   setDirectionID(directionObj.direction_id);
      setDirection(directionObj.direction_name);
      console.log("New direction is", direction);
    } catch {}
  };

  const directionChange = () => {
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
          console.log(event.target.value);
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
        value={route.direction_name}
        onChange={(event) => {
          //   event.preventDefault();
          directionChange(event);
          searchDirection(event.target.value);
          setDirectionID(event.target.value);
          console.log("on click directionID", event.target.id);
        }}
      >
        {directionList.map((dir, i) =>
          dir.direction_id == detail.direction_id ? (
            <option selected value={dir.direction_id}>
              {dir.direction_name}
            </option>
          ) : (
            <option value={dir.direction_id}>{dir.direction_name}</option>
          )
        )}
      </select>

      {/* STOPSSSSSSS */}

      <select
        onChange={(event) => {
          setStop(event.target.value);
        }}
      >
        {stopList.length > 0 &&
          stopList.map((place, i) =>
            place.place_code == detail.place_code ? (
              <option
                selected
                id={place.place_code}
                value={place.description}
              >{place.description}</option>
            ) : (
              <option id={place.place_code} value={place.description}>
                {place.description}
              </option>
            )
          )}
      </select>

      <p>Notify At: {detail.time}</p>
      <button onClick={() => setEdit(false)}>Back</button>
    </div>
  );
}

export default DetailEdit;
