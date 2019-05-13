const router = require("express").Router();
const passport = require("passport");
const Board = require("../../../../models/Board");
const toolkit = require("../../../../utils/toolkit");
const inputValidation = require("../../../../utils/inputValidation");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const inputErrors = await inputValidation.board(req.body);
      if (inputErrors) {
        return toolkit.handler(res, 400, inputErrors);
      } else {
        const boardExists = await Board.findOne({ name: req.body.name });
        if (boardExists) {
          return toolkit.handler(
            res,
            403,
            "A board with this name already exists."
          );
        } else {
          const newBoard = new Board({
            owner: req.user.id,
            name: req.body.name
          });
          newBoard.save();
          return toolkit.handler(res, 200, newBoard);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
);

module.exports = router;
