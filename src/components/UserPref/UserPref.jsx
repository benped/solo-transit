import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
const { default: axios } = require("axios");

import Card from "@mui/material/Card";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import { Button, CardActionArea, CardActions } from "@mui/material";
import { blue } from "@mui/material/colors";

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
      console.log("error on axios get", error);
    }
  };

  const UserPrefDetail = () => {
    history.push(`/detail/${route.preference_id}`); // to detail view
  };

  const sendText = () => {
    dispatch({type:"TEXT_ME", payload: {
      route: route,
      phone: 2626744046
    }})
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, minWidth: 345, marginTop: 2, boxShadow: 3 }}>
        <CardActionArea>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", margin: 2 }}
          >
            <Box sx={{marginTop: 1}}>
              {route.route_id > 886 && route.route_id < 924 ? (
                <Typography variant="h5" component="div">
                  {route.route_label}
                </Typography>
              ) : (
                <Typography variant="h2" component="div">
                  {route.route_id}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "inline", textAlign: "right", marginTop: 1 }}>
              <Typography variant="body2" color="text.primay">
                {route.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {route.direction_name}
              </Typography>
            </Box>
          </Box>
        </CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: 1,
          }}
        >
          <Box>
            <Typography onClick={()=> sendText()}variant="body2" color="text.secondary">
              Arriving: {arrival} <OnlinePredictionIcon fontSize="small" />
            </Typography>
          </Box>
          <Button size="small" color="primary" onClick={UserPrefDetail}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default UserPref;
