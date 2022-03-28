import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  const theme = createTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <form className="formPanel" onSubmit={login}>
        <h2>Login</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
            autoComplete="off"
              id="standard-basic"
              label="Username"
              htmlFor="username"
              variant="standard"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Box>
        <div>

        </div>
        <div>
        <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
            autoComplete="off"
              required
              id="standard-basic"
              label="Password"
              htmlFor="password"
              type="password"
              variant="standard"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Box>
        </div>
        <div>
          <Button className="btn" type="submit" name="submit" value="Log In" onClick={() => handleSubmit} >Log In </Button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
