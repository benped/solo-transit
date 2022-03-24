import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";

import Typography from "@mui/material/Typography";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">
          <DepartureBoardIcon />
        </h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Link className="navLink" to="/user">
              Home
            </Link> */}
{/* 
            <Link className="navLink" to="/addroute">
              Add Route
            </Link> */}

            {/* <Link className="navLink" to="/about">
              <Typography>About</Typography>
            </Link> */}
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
