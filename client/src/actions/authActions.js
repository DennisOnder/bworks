import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

const dispatchErrors = error => ({
  type: GET_ERRORS,
  payload: error.response.data
});

export const loginUser = data => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8001/auth/login", data);
    const { token } = res.data;
    localStorage.setItem("token", token);
    dispatch(setCurrentUser(token));
  } catch (error) {
    dispatch(dispatchErrors(error));
  }
};

export const registerUser = data => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8001/auth/register", data);
    console.log("Registered: ", res.data.email);
  } catch (error) {
    dispatch(dispatchErrors(error));
  }
};

export const setCurrentUser = token => {
  const payload = jwt_decode(token);
  return {
    type: SET_CURRENT_USER,
    payload
  };
};
