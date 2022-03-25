import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function DetailEdit({ setEdit }) {
  const detail = useSelector((store) => store.detailReducer);
  const [time, setTime] = useState(detail.time);
  const [phone, setPhone] = useState(Number(detail.phone));
  const [email, setEmail] = useState(String(detail.email));
  const history = useHistory();
  const dispatch = useDispatch();
  let notify_mode;

  useEffect(() => {
    console.log('inside detail edit. detail is', detail);
    // setUpFunction();
    // getRoutes();
    // setRoute(detail.route_id);
  }, []);

  const saveClicked = () => {
    console.log("TIme is:", time);
    console.log("Preference ID is", detail.preference_id);
    if (alignment === "text") {
      notify_mode = "text";
    } else notify_mode = "email";
    const payload = {
      phone: String(phone),
      email: String(email),
      notify_mode: notify_mode,
      time: time,
      preference_id: detail.preference_id,
    };
    console.log("payload is", payload);
    dispatch({ type: "UPDATE_NOTIFICATIONS", payload: payload });
    dispatch({ type: "FETCH_USER_PREF" });

    history.push("/");
  };
  const [alignment, setAlignment] = useState("text");

  const deliverChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const deleteClicked = () => {
    console.log("Delete Clicked");
    dispatch({ type: "DELETE_ROUTE_PREF", payload: detail.preference_id });
    history.push("/");
  };

  return (
    <Paper sx={{ m: 1 }} elevation={4}>
      {/* <Box component="svg" sx={{ width: 100, height: 100 }}> */}
      <Button sx={{ m: 2 }} onClick={() => history.push("/")} variant="text">
        Back
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Box
          sx={{
            display: "inline",
            textAlign: "left",
            marginTop: 1,
            marginLeft: 3,
          }}
        >
          {detail.route_id > 886 && detail.route_id < 924 ? (
            <Typography variant="h3" component="div">
              {detail.route_label}
            </Typography>
          ) : (
            <Typography variant="h2" component="div">
              {detail.route_id}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "inline",
            textAlign: "left",
            marginTop: 1,
            marginLeft: 3,
          }}
        >
          <Typography variant="h5" color="text.primay">
            {detail.description}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {detail.direction_name}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Change Notification Time</Typography>
        {/* <p>Notify At: {detail.time}</p> */}
        <input
          type="time"
          id="notify"
          name="notify"
          defaultValue={time}
          onChange={(event) => setTime(event.target.value)}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Typography variant="h6">Update Notification Delivery</Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          sx={{
            p: 1,
            m: 1,
          }}
          exclusive
          onChange={deliverChange}
        >
          <ToggleButton value="text">SMS</ToggleButton>
          <ToggleButton value="email">Email</ToggleButton>
        </ToggleButtonGroup>
        <Box
          sx={{
            p: 1,
            m: 1,
          }}
        >
          {alignment == "text" ? (
            <TextField
              type="number"
              label="phone"
              variant="standard"
              autoComplete="off"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              // onChange={() => console.log(detail)}
            />
          ) : (
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              autoComplete="off"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          )}
        </Box>
        <Button variant="contained" onClick={() => saveClicked()}>
          Save
        </Button>
      </Box>

      <Box
        sx={{
          padding: 3,
          marginTop: 4,
          justifyContent: "center",
          direction: "row",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => deleteClicked()} color="error">
          Delete Route
        </Button>
      </Box>
      {/* </Box> */}
    </Paper>
  );
}

export default DetailEdit;
