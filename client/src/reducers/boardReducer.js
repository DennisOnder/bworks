import { GET_BOARDS, SET_BOARD } from "../actions/types";

const initialState = {
  all: [],
  current: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOARDS:
      return {
        all: action.payload
      };
    case SET_BOARD:
      return {
        current: action.payload
      };
    default:
      return state;
  }
}
