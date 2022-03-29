import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <>
      {/* <>
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
    </> */}

      <form className="formPanel" onSubmit={registerUser}>
        <h2>Register User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
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
            htmlFor="username"
            label="username"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            htmlFor="password"
            label="password"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Box>
        <div>
          <Button
            className="btn"
            type="submit"
            name="submit"
            value="Register"
            onClick={() => registerUser}
          >
            Register
          </Button>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
