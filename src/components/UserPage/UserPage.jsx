import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";

import UserPref from "../UserPref/UserPref.jsx";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const routes = useSelector((store) => store.userRoutesReducer);

  const dispatch = useDispatch();

  // const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER_PREF" });
  }, []);

  console.log(routes);

  return (
    <>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>       
        {/* Ternary needs to be here to wait for async to catch up */}
        {routes.length > 0 ? 
          <div>
            {routes.map((route, i) => {
              return( <UserPref route={route} key={i} />)
            })}
          </div> : <span>poop</span> }

        {/* {/* <LogOutButton className="btn" /> */}
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
