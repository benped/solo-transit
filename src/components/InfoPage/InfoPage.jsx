import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import RouteList from "../RouteList/RouteList";

import Directions from "../Directions/Directions";
import Stops from "../Stops/Stops";

import stopSaga from "../../redux/sagas/stops.saga";

function InfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const routes = useSelector((store) => store.routeReducer);
  const userPref = useSelector((store) => store.userPrefReducer);
  const direction = useSelector((store) => store.directionReducer);
  const stops = useSelector((store) => store.stopReducer);

  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_ROUTES" });
  }, []);

  // console.log(newBusArr);

  return (
    <div>
      <Router>
        <div className="container">
          <p>Info Page</p>

          <Route path="/info/" exact>
            <RouteList routes={routes} />
          </Route>

          <Route path="/info/directions">
            <Directions />
          </Route>

          <Route path="/info/stops">
            <Stops />
          </Route>

          {/* <form>
            <label for="appt">Select a time:</label>
            <input type="time" id="appt" name="appt" />
            <input type="submit" />
          </form> */}
        </div>
      </Router>
    </div>
  );
}

export default InfoPage;
