import axios from "axios";
import dispatchErrors from "./dispatchErrors";
import { GET_BOARDS, SET_BOARD } from "./types";

const opts = {
  headers: { Authorization: localStorage.token }
};

export const getBoards = () => async dispatch => {
  try {
    const boards = await axios.get("http://localhost:8002/board/get/all", opts);
    dispatch({
      type: GET_BOARDS,
      payload: boards.data
    });
  } catch (error) {
    dispatch(dispatchErrors(error));
  }
};

export const getBoard = boardId => async dispatch => {
  try {
    const board = await axios.get(
      `http://localhost:8002/board/get/id/${boardId}`,
      opts
    );
    dispatch({
      type: SET_BOARD,
      payload: board.data
    });
  } catch (error) {
    dispatch(dispatchErrors(error));
  }
};
