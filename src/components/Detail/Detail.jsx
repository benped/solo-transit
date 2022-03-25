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

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch({ type: "GET_DETAIL", payload: id });
  }, []);


  return (
    <>

        <div>
          <DetailEdit />
        </div>

    </>
  );
}

export default Detail;
