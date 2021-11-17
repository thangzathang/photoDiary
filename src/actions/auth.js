import * as api from "../api/index.js";
import { AUTH } from "../constants/actionTypes";

// Sign Up
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // Login the User
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

// Sign In
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // Sign Up the User
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
