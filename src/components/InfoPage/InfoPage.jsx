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
import Summary from "../Summary/Summary";
import stopSaga from "../../redux/sagas/stops.saga";

// MUI IMPORTS
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ClearIcon from '@mui/icons-material/Clear';

const fabStyle = {
  margin: 0,
  top: "auto",
  left: "auto",
  bottom: 20,
  right: 20,
  position: "fixed",
};


function InfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const stops = useSelector((store) => store.stopReducer);
  const routes = useSelector((store) => store.routeReducer);
  
  const [routeLabel, setRouteLabel] = useState("Route");
  const [directionLabel, setDirectionLabel] = useState("Direction");
  const [routeParam, setRouteParam] = useState("");
  const [directionObj, setDirectionObj] = useState({});
  const [selectedStop, setSelectedStop] = useState("");
  const [stopLabel, setStopLabel] = useState("Stop");
  const defaultStop = {
    direction: 1,
  };
  const [stop, setStop] = useState("Stop");
  const [next, setNext] = useState(false);

  const [phone, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notify_mode, setNotify_Mode] = useState("text");

  const [textField, setTextField] = useState(false);
  const [timeChecker, setTimeChecker] = useState(false);


  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_ROUTES" });
    console.log(stop);
    console.log(stop.description);
  }, []);

  // console.log(newBusArr);
  const summary = useSelector((store) => store.summaryReducer);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = (index) => {
    // console.log(routes);
    // INSERT FINAL STEP ACTIONS HERE
    if (index === steps.length - 1) {
      dispatch({
        type: "CONFIRM_NEW_PREF",
        payload: {
          route_id: routeParam,
          route_label: routeLabel,
          direction_id: directionObj.direction_id,
          direction_name: directionObj.direction_name,
          place_code: stop.place_code,
          description: stop.description,
          time: notify.value,
          phone: String(phone),
          email: String(email),
          notify_mode: notify_mode,
        },
      });
    }
    // console.log(setps.length);
    // console.log(index);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setRouteLabel("Route");
    setDirectionLabel("Direction");
    setRouteParam("");
    setDirectionObj({});
    setSelectedStop("");
    setStopLabel("Stop");
    setStop("");
    dispatch({ type: "RESET_USER_PREF" });
    setActiveStep(0);

    history.push("/");
  };

  const steps = [
    {
      stepContent: (
        <RouteList
          routes={routes}
          setRouteLabel={setRouteLabel}
          setRouteParam={setRouteParam}
          setNext={setNext}
        />
      ),
      label: routeLabel,
    },
    {
      stepContent: (
        <Directions
          setDirectionLabel={setDirectionLabel}
          routeParam={routeParam}
          setDirectionObj={setDirectionObj}
          setNext={setNext}
          directionLabel={directionLabel}
        />
      ),
      label: directionLabel,
    },
    {
      stepContent: (
        <Stops
          routeParam={routeParam}
          directionObj={directionObj}
          setStopLabel={setStopLabel}
          setStop={setStop}
          stop={stop}
          setNext={setNext}
        />
      ),
      label: "Stop",
    },
    {
      stepContent: (
        <Summary
          setNext={setNext}
          notify_mode={notify_mode}
          setNotify_Mode={setNotify_Mode}
          setTextField={setTextField}
          setTimeChecker={setTimeChecker}
          setNumber={setNumber}
          setEmail={setEmail}
          phone={phone}
          email={email}
        />
      ),
      label: "Notification",
    },
  ];

  return (
    <div>
      <Box
        sx={{
          paddingLeft: 5,
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical" required>
          {steps.map((step, index) => (
            <Step key={step.label} >
              <StepLabel
                optional={
                  index === 3 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {activeStep === index ? (
                  <Typography variant="h3">{step.label}</Typography>
                ) : (
                  <Typography>{step.label}</Typography>
                )}
              </StepLabel>
              <StepContent>
                {step.stepContent}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    marginBottom: 2,
                    marginTop: 3
                  }}
                >
                  <div>
                    <Button
                      disabled={next === false}
                      variant="contained"
                      onClick={() => {
                        handleNext(index);
                      }}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper  square elevation={0} sx={{ p: 3, backgroundColor:"rgba(52, 52, 52, 0)" }}>
            <Typography variant="h2" >Route added!</Typography>
            <Button variant="contained" onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Home
            </Button>
          </Paper>
        )}
      </Box>
      <Fab sx={fabStyle} color="error" aria-label="add" >
          <ClearIcon onClick={() => {handleReset(); history.push('/')}} />
        </Fab>
    </div>
  );
}

export default InfoPage;
