import jwtDecode from "jwt-decode";

export default () =>
  localStorage.token
    ? jwtDecode(localStorage.token).exp > Date.now() / 1000
    : false;
