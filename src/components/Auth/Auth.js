import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Goggle Login for the modal.
import { GoogleLogin } from "react-google-login";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";

import { signin, signup } from "../../actions/auth";
import Icon from "./icon";
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  // Utils
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const classes = useStyles();

  // State
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  // Functions
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Differentiate if we are Signing Up or Signing In
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  // This will toggle the form from Sign Up to Sign In
  const switchMode = () => {
    setIsSignUp((prev) => {
      return !prev;
    });
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    // Smart syntax - optional chaining ("?")
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigate("/");
      // Sort this out
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => {
    console.log("Google Sign in was unsuccessful");
    console.log(error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {/* Every Input tag is an input box with place holder */}
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>

          {/* The big submit button  */}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId="218211283717-27mhk1rqsu1hnaka9t05fhmlnnq7ek4l.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Sign In using Google!
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />

          {/* Button to toggle to either Sign in or Sign Up */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
