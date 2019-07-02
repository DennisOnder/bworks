import { GET_ERRORS } from "./types";

export default error => ({
  type: GET_ERRORS,
  payload: error.response.data
});
