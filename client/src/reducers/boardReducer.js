import { GET_BOARDS, SET_BOARD } from "../actions/types";

const initialState = {
  boards: [],
  currentBoard: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOARDS:
      return {
        boards: action.payload
      };
    case SET_BOARD:
      return {
        currentBoard: action.payload
      };
    default:
      return state;
  }
}
