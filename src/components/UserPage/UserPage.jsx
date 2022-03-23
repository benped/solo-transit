import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import UserPref from "../UserPref/UserPref.jsx";
import "../UserPref/UserPref.css";

const fabStyle = {
  margin: 0,
  top: 'auto',
  left: 'auto',
  bottom: 20,
  right: 20,
  position: 'fixed',
};

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const userRoutes = useSelector((store) => store.userRoutesReducer);
  const arrivals = useSelector((store) => store.arrivalsReducer);
  const history = useHistory();
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
        
        {/* Add in to ternary for no routes here */}
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        {userRoutes.length > 0 && 
        userRoutes.map((route, i) => {
          return <UserPref route={route} key={i} />;
        })}
        </Box>
        <Fab sx={fabStyle} color="primary" aria-label="add">
        <AddIcon onClick={() => history.push('/addRoute')}/>
      </Fab>
        {/* {/* <LogOutButton className="btn" /> */}
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
