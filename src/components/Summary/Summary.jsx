import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";

function Summary({ setNext, setTimeChecker, setTextField }) {
  const dispatch = useDispatch();
  // const userPref = useSelector((store) => store.userPrefReducer);
  const summary = useSelector((store) => store.summaryReducer);

  const history = useHistory();
  const [alignment, setAlignment] = useState("text");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // const [textField, setTextField] = useState(false);
  // const [timeChecker, setTimeChecker] = useState(false);
  let notify_mode;

  useEffect(() => {
    console.log("in summary useEffect");
    setNext(false);
    // if (textField === true && timeChecker === true) {
    //   setNext(true);
    // }
  }, []);

  const deliverChange = (event, newAlignment) => {
    console.log("inside delivery change, newAlignment is", newAlignment);
    setAlignment(newAlignment);
    if (newAlignment === "text") {
      notify_mode = "text";
    } else notify_mode = "email";
  };

  return (
    <>
      <Box
        sx={{
          justifyContent: "left",
          flexDirection: "column",
          alignItems: "left",
          marginTop: 2,
        }}
      >
        <Typography marginBottom={2} variant="h6">
          When do you want to be notified?
        </Typography>

        <input        
          type="time"
          id="notify"
          name="notify"
          defaultValue={0}
        />

        <Typography marginTop={2} variant="h6">
          Delivery
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          sx={{
            paddingTop: 1,
          }}
          exclusive
          onChange={deliverChange}
        >
          <ToggleButton value="text" disabled={alignment === "text"}>
            SMS
          </ToggleButton>
          <ToggleButton value="email" disabled={alignment === "email"}>
            Email
          </ToggleButton>
        </ToggleButtonGroup>
        <Box>
          {alignment == "text" ? (
            <TextField
              type="number"
              label="phone"
              variant="standard"
              onChange={(event) => {
                setPhone(event.target.value);
                console.log('inside phone field on change');
                setNext(true);
              }}
            />
          ) : (
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              value={email}
              
              onChange={(event) => {
                console.log('inside text field on change');
                setEmail(event.target.value);
                setNext(true)
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export default Summary;
