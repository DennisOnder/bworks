const router = require("express").Router();
const Board = require("../../../../models/Board");
const toolkit = require("../../../../utils/toolkit");
const inputValidation = require("../../../../utils/inputValidation");
const verifyUser = require("../../../../utils/verifyUser");

router.post("/create", verifyUser, async (req, res) => {
  try {
    const newBoard = new Board({
      owner: req.user.id,
      name: req.body.name
    });
    const boardExists = await Board.findOne({
      name: newBoard.name,
      owner: newBoard.owner
    });
    const inputErrors = await inputValidation.board(newBoard);
    if (!boardExists) {
      if (!inputErrors) {
        await newBoard.save();
        console.log(`Board ${newBoard._id} created.`);
        return toolkit.handler(res, 200, newBoard);
      } else {
        return toolkit.handler(res, 400, inputErrors);
      }
    } else {
      return toolkit.handler(
        res,
        403,
        `You already have a board named ${newBoard.name}.`
      );
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/get/single/:boardId", verifyUser, async (req, res) => {
  const board = await Board.findOne({
    owner: req.user.id,
    _id: req.params.boardId
  });
  board
    ? toolkit.handler(res, 200, board)
    : toolkit.handler(res, 404, "Board not found.");
});

router.get("/get/all", verifyUser, async (req, res) => {
  const boards = await Board.find({ owner: req.user.id });
  return toolkit.handler(res, 200, boards);
});

module.exports = router;
