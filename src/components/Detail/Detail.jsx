import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import DetailEdit from "../DetailEdit/DetailEdit";

import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

function Detail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const detail = useSelector((store) => store.detailReducer);
  const arrival = useSelector((store) => store.arrivalReducer);
  const [edit, setEdit] = useState(false);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch({ type: "GET_DETAIL", payload: id });
  }, []);

  const backButton = () => {
    console.log("Inside back button");
    history.push("/");
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      {edit === false ? (
        <div>
          <Stack mr={2} ml={2} spacing={12} direction="row" justifyContent="space-between">
            <Button variant="text" onClick={() => backButton()}>Back</Button>
            <Button variant="contained" onClick={() => setEdit(true)}>Edit</Button>
          </Stack>
          <h1> <DirectionsBusIcon/> {detail.route_id}</h1>
          <p>Arrives in: {arrival.arrival}</p>
          <p> {detail.description}</p>
          <p>{detail.direction_name}</p>
          <p>Notify At: {detail.time}</p>
        </div>
      ) : (
        <div>
          <DetailEdit setEdit={setEdit} />
        </div>
      )}
    </>
  );
}

export default Detail;
