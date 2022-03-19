import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from "@mui/material/TextField";

function DetailEdit({ setEdit }) {
  const detail = useSelector((store) => store.detailReducer);
  const [time, setTime] = useState(detail.time);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  let notify_mode;

  useEffect(() => {
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
        phone: phone,
        email: email,
        notify_mode: notify_mode,
        time: time
    }
    console.log("payload is",payload);
    dispatch({type: "UPDATE_NOTIFICATIONS", payload: payload})
  };
  const [alignment, setAlignment] = useState("text");

  const deliverChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleOnPhoneChange = (value) => {
    setPhone(
      value
    );
  };

//   const handleOnEmailChange = (value) => {
//       console.log(value);
//       setEmail(value);
//   };

  return (
    <div>
      <button onClick={() => setEdit(false)}>Back</button> <h1> Edit </h1>
      <h5>{detail.route_id}</h5>
      <h5>{detail.description}</h5>
      <h5>{detail.direction_name}</h5>
      <h2>Change Notification TIme</h2>
      {/* <p>Notify At: {detail.time}</p> */}
      <input
        type="time"
        id="notify"
        name="notify"
        defaultValue={time}
        onChange={(event) => setTime(event.target.value)}
      />
      <h2>Update Notification Delivery</h2>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={deliverChange}
      >
        <ToggleButton value="text">Text</ToggleButton>
        <ToggleButton value="email">Email</ToggleButton>
      </ToggleButtonGroup>
      {alignment == "text" ? (
        <MuiPhoneNumber
          defaultCountry={"us"}
          onlyCountries={["us"]}
          onChange={handleOnPhoneChange}
        />
      ) : (
        <TextField id="standard-basic" label="Standard" variant="standard" value={email} onChange={(event) =>setEmail(event.target.value)}/>
      )}
      <button onClick={() => saveClicked()}>Save</button>
      <h2>Delete Route Reminder</h2>
      <button>Delete</button>
    </div>
  );
}

export default DetailEdit;
