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
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function InfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const stops = useSelector((store) => store.stopReducer);
  const routes = useSelector((store) => store.routeReducer);
  const [routeLabel, setRouteLabel] = useState('Route');
  const [directionLabel, setDirectionLabel] = useState('Direction');
  const [routeParam, setRouteParam] = useState('');
  const [directionObj, setDirectionObj] = useState({});
  const [selectedStop, setSelectedStop] = useState('');
  const [stopLabel, setStopLabel] = useState('Stop');

  
  // const updateStop = () => {
  //   let found = stops.find(e => e.place_code === selectedStop);
  //   console.log(found);
  //   setStopLabel(found.description);
  // }

  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_ROUTES" });
  }, []);

  // console.log(newBusArr);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    { stepContent: <RouteList routes={routes} setRouteLabel={setRouteLabel} setRouteParam={setRouteParam}/>, label: routeLabel },
    { stepContent: <Directions setDirectionLabel={setDirectionLabel} routeParam={routeParam} setDirectionObj={setDirectionObj}/>, label: directionLabel },
    { stepContent: <Stops routeParam={routeParam} directionObj={directionObj} setSelectedStop={setSelectedStop} />, label: stopLabel },
    { stepContent: <Summary />, label: "Summary" },
  ];

  return (
    <div>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 3 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {step.stepContent}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
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
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>

      {/* <Router>
        <div className="container">

          <Route path="/info/" exact>
            <RouteList routes={routes} />
          </Route>

          <Route path="/info/directions/:routeParam/" exact>
            <Directions />
          </Route>

          <Route path="/info/directions/stops/:routeParam/:directionParam" exact >
            <Stops />
          </Route>

          <Route path="/info/directions/stops/summary/:routeParam/:directionParam/:placeCode" exact>
            <Summary />
          </Route>

        </div>
      </Router> */}
    </div>
  );
}

export default InfoPage;
