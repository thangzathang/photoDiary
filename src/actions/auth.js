import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

// Sign Up
export const signin = (formData, navigate) => async () => {
  try {
    // Login the User

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

// Sign In
export const signup = (formData, navigate) => async () => {
  try {
    // Sign Up the User

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
