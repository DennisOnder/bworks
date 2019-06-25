const router = require("express").Router();
const Board = require("../../../../models/Board");
const toolkit = require("../../../../utils/toolkit");
const inputValidation = require("../../../../utils/inputValidation");

router.post("/create", async (req, res) => {
  try {
    const inputErrors = await inputValidation.board(req.body);
    if (inputErrors) {
      return toolkit.handler(req, 400, inputErrors);
    } else {
      const boardExists = await Board.findOne({
        name: req.body.name,
        owner: req.user.id
      });
      if (boardExists) {
        return toolkit.handler(
          res,
          403,
          `You already have a board named ${req.body.name}.`
        );
      } else {
        const newBoard = new Board({
          owner: req.user.id,
          name: req.body.name
        });
        await newBoard.save();
        console.log(`Board ${newBoard._id} created.`);
        return toolkit.handler(res, 200, newBoard);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/get/id/:boardId", async (req, res) => {
  const board = await Board.findOne({
    owner: req.user.id,
    _id: req.params.boardId
  });
  board
    ? toolkit.handler(res, 200, board)
    : toolkit.handler(res, 404, "Board not found.");
});

router.get("/get/all", async (req, res) => {
  const boards = await Board.find({ owner: req.user.id });
  return toolkit.handler(res, 200, boards);
});

module.exports = router;
