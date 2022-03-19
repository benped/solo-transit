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
  const [directionValue, setDirectionValue] =useState(detail.direction_id);
  const [directionPassThrough, setDirectionPassThrough] = useState({direction_id:detail.direction_id, direction_name:detail.direction_name})
  const [directionID, setDirectionID] = useState(detail.direction_id);

  const [stopList, setStopList] = useState([]);
  const [stop, setStop] = useState({place_code:detail.place_code, description: detail.description});
  const [stopValue, setStopValue] = useState(detail.description)

  const [defaultStop, setDefaultStop ] = useState(detail.description)

  useEffect(() => {
    setUpFunction();
    // getRoutes();
    // setRoute(detail.route_id);
  }, []);

  console.log("Detail is", detail);
  console.log("DirectionList is", directionList);
  console.log("Direction is ID", directionID);
  console.log("Direction is", direction);

  const setUpFunction = async () => {
    try {
      const response = await axios.get(
        "https://svc.metrotransit.org/nextripv2/routes"
      );
      console.log(response.data);
      setRouteList(response.data);
      const dirs = await axios.get(
        `https://svc.metrotransit.org/nextripv2/directions/${detail.route_id}`
      );
      console.log(response.data);
      setDirectionList(dirs.data);
      const stops = await axios.get(
        `https://svc.metrotransit.org/nextripv2/stops/${detail.route_id}/${detail.direction_id}`
      );
      setStopList(stops.data);
    } catch {
      ("error on setUpFunction");
    }
  };

  const getRoutes = async () => {
    try {
      const response = await axios.get(
        "https://svc.metrotransit.org/nextripv2/routes"
      );
      console.log(response.data);
      setRouteList(response.data);
      getDirections(detail.route_id);
    } catch {
      console.log("error on axios get");
    }
  };

  const getDirections = async (inputRoute) => {
    try {
      // console.log('about to setRoute to', inputRoute);
      // setRoute(inputRoute);
      console.log("inside Get directions with route:", inputRoute);
      const response = await axios.get(
        `https://svc.metrotransit.org/nextripv2/directions/${inputRoute}`
      );
      console.log("firing getDirections");
      console.log(response.data);
      setDirectionList(response.data);
      // set direction value to 0, this is id, can't change
    //   setDirectionValue(0)
        setDirection(response.data[0].direction_name)
        setDirectionPassThrough(response.data[0])
      //   setDirectionID(response.data[0].direction_id)
      getStops(inputRoute, 0);
    } catch {
      console.log("error on directions get");
    }
  };

  const getStops = async (inputRoute, directionID) => {
    try {
      await console.log("direction id is", direction);

      const response = await axios.get(
        `https://svc.metrotransit.org/nextripv2/stops/${inputRoute}/${directionID}`
      );
      console.log(response);
      setStopList(response.data);
      setStop(response.data[0])
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

  // Need to send with route and direction or will fail. 
  const directionChange = (selectedID) => {
    getStops(route,selectedID);
    setDirectionID(selectedID);
    // setStop("");

  };

  const routeChange = (value) => {
    getDirections(value);
  };

  const saveClicked = () => {
    console.log("route is", route);
    console.log("Stop is", stop);
    console.log('direction value is',directionValue);
    console.log("Direction is ID", directionID);
    console.log("Direction is", direction);
    console.log('stop value is', stopValue);
    console.log('Direction Pass Through is', directionPassThrough);
  }

  return (
    <div>
      <h1> Edit </h1>
      {/* <input  value={} /> */}
      <select
        // value={route}
        onChange={(event) => {
          //   setRoute(event.target.value);
          console.log(event.target.value);
          
          //   getDirections();
          routeChange(event.target.value);
          setRoute(event.target.value)
          
          
        }}
      >
        {routeList.length > 0 &&
          routeList.map((route, i) =>
            route.route_id == detail.route_id ? (
              <option id={i} selected value={route.route_id}>
                {route.route_label}
              </option>
            ) : (
              <option id={i} value={route.route_id}>
                {route.route_label}
              </option>
            )
          )}
      </select>

      {/* DIRECTION REDUCER AND DROPDOWN */}
      <select
      placeholder="Direction"
        value={directionValue}
        onChange={(event) => {
          //   event.preventDefault();
          directionChange(event.target.value);
          searchDirection(event.target.value);
          setDirectionID(event.target.value);
          setDirectionValue(event.target.value);
          console.log("on click directionID", event.target.id);
        }}
      >
        {directionList.map((dir, i) =>
          dir.direction_name === detail.direction_name ? (
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
      value={stopValue}
        onChange={(event) => {
        //   setStop(event.target.value);
          setStopValue(event.target.value)
        }}
      >
        {stopList.length > 0 &&
          stopList.map((place, i) =>
            place.place_code == defaultStop ? (
              <option selected id={place.place_code} value={place.description}>
                {place.description}
              </option>
            ) : (
              <option id={place.place_code} value={place.description}>
                {place.description}
              </option>
            )
          )}
      </select>

      {/* <p>Notify At: {detail.time}</p> */}
      <input type="time" id="notify" name="notify" defaultValue={detail.time} />
      <button onClick={() => setEdit(false)}>Back</button>
      <button onClick={() => saveClicked()}>Save</button>
    </div>
  );
}

export default DetailEdit;
