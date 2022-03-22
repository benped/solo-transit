import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";


import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";



function Summary({ setNext }) {
  const dispatch = useDispatch();
  // const userPref = useSelector((store) => store.userPrefReducer);
  const summary = useSelector((store) => store.summaryReducer);

  const history = useHistory();
  const [alignment, setAlignment] = useState("text");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  let notify_mode;

  // const { route, direction, stop } = userPref;
  // const {
  //   route_id,
  //   route_label,
  //   direction_id,
  //   direction_name,
  //   place_code,
  //   description,
  // } = summary;
  // const { routeParam, directionParam, placeCode } = useParams();

  // useEffect(() => {
  //   dispatch({
  //     type: "GET_ALL_DATA",
  //     payload: {
  //       direction: directionParam,
  //       route: routeParam,
  //       placeCode: placeCode,
  //     },
  //   });
  // }, []);

  useEffect(() => {
    console.log('in summary useEffect');;
    setNext(false);
  }, []);

  const backButton = () => {
    history.push("/info/stops");
  };

  const nextButton = () => {
    console.log(summary);
    console.log("inside confirm", notify.value);
    dispatch({
      type: "CONFIRM_NEW_PREF",
      payload: {
        route_id: route_id,
        route_label: route_label,
        direction_id: direction_id,
        direction_name: direction_name,
        place_code: place_code,
        description: description,
        time: notify.value,
      },
    });
    dispatch({ type: "FETCH_USER_PREF" });
    history.push("/");
  };

  const deliverChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (newAlignment === "text") {
      notify_mode = "text";
    } else notify_mode = "email";
  };

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

  // place_code

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Typography marginBottom={2} variant="h6">When do you want to be notified?</Typography>

          <input type="time" id="notify" name="notify" defaultValue={0} />

        <Typography marginTop={2} variant="h6">Delivery</Typography>
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
              onChange={(event) => setPhone(event.target.value)}
            />
          ) : (
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          )}
        </Box>
        {/* <Button onClick={() => saveClicked()}>Save</Button> */}
      </Box>
      {/* <div>
        <button onClick={backButton}>Back</button>
        <button onClick={nextButton}>Next</button>
      </div> */}
    </>
  );
}

export default Summary;
