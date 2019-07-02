import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import boardReducer from "./boardReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  board: boardReducer
});
