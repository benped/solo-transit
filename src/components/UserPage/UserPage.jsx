import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";

import UserPref from "../UserPref/UserPref.jsx";
import "../UserPref/UserPref.css";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const userRoutes = useSelector((store) => store.userRoutesReducer);
  const arrivals = useSelector((store) => store.arrivalsReducer);

  const dispatch = useDispatch();

  // const user = useSelector(store => store.user);

  useEffect(() => {
    // dispatch({ type: "FETCH_USER_PREF" });
  }, [dispatch]);

  // console.log();

  return (
    <>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your Transit Routes:</p>
        {/* Add in to ternary for no routes here */}
        {userRoutes.length > 0 && 
        userRoutes.map((route, i) => {
          return <UserPref route={route} key={i} />;
        })}

        {/* {/* <LogOutButton className="btn" /> */}
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
