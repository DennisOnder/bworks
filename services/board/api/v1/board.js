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

router.post("/list/create/:boardId", async (req, res) => {
  const inputErrors = await inputValidation.list(req.body);
  const board = await Board.findOne({
    owner: req.user.id,
    _id: req.params.boardId
  });
  if (inputErrors) return toolkit.handler(res, 400, inputErrors);
  if (board) {
    board.lists.push({ listName: req.body.listName });
    await board.save();
    return toolkit.handler(res, 200, board.lists);
  } else {
    return toolkit.handler(res, 404, "Board not found.");
  }
});

router.delete("/list/delete/:boardId/:listId", async (req, res) => {
  const board = await Board.findOne({
    owner: req.user.id,
    _id: req.params.boardId
  });
  if (board) {
    if (board.lists.length > 0) {
      for (let i = 0; i < board.lists.length; i++) {
        if (
          i === board.lists.length - 1 &&
          board.lists[i].id !== req.params.listId
        )
          return toolkit.handler(res, 404, "No list found.");
        if (board.lists[i].id === req.params.listId) {
          board.lists.splice(i, 1);
          await board.save();
          return toolkit.handler(res, 200, board.lists);
        }
      }
    } else {
      return toolkit.handler(res, 400, "Board has no lists.");
    }
  } else {
    return toolkit.handler(res, 404, "Board not found.");
  }
});

router.post("/task/create/:boardId/:listId", async (req, res) => {
  const board = await Board.findOne({
    owner: req.user.id,
    _id: req.params.boardId
  });
  if (board) {
    if (board.lists.length > 0) {
      for (let i = 0; i < board.lists.length; i++) {
        if (board.lists[i].id === req.params.listId) {
          board.lists[i].tasks.push({ taskBody: req.body.taskBody });
          await board.save();
          return toolkit.handler(res, 200, board.lists[i]);
        }
      }
    } else {
      return toolkit.handler(res, 400, "Board has no lists.");
    }
  } else {
    return toolkit.handler(res, 404, "Board not found.");
  }
});

router.delete("/task/delete/:boardId/:listId/:taskId", async (req, res) => {
  const board = await Board.findOne({
    owner: req.user.id,
    _id: req.params.boardId
  });
  if (board) {
    if (board.lists.length > 0) {
      for (let i = 0; i < board.lists.length; i++) {
        if (
          i === board.lists.length - 1 &&
          board.lists[i].id !== req.params.listId
        )
          return toolkit.handler(res, 404, "No list found.");
        if (board.lists[i].id === req.params.listId) {
          for (let j = 0; j < board.lists[i].tasks.length; j++) {
            if (
              j === board.lists[i].tasks.length - 1 &&
              board.lists[i].tasks[j].id !== req.params.taskId
            )
              return toolkit.handler(res, 404, "Task not found.");
            if (board.lists[i].tasks[j].id === req.params.taskId) {
              board.lists[i].tasks.splice(j, 1);
              await board.save();
              return toolkit.handler(res, 200, board.lists[i]);
            }
          }
        }
      }
    } else {
      return toolkit.handler(res, 400, "Board has no lists.");
    }
  } else {
    return toolkit.handler(res, 404, "Board not found.");
  }
});

router.delete("/delete/:boardId", async (req, res) => {
  const board = await Board.findOne({
    owner: req.user.id,
    _id: req.params.boardId
  });
  if (board) {
    await board.remove();
    return toolkit.handler(res, 200, { deleted: true, timestamp: Date.now() });
  } else {
    return toolkit.handler(res, 404, "Board not found.");
  }
});

module.exports = router;
