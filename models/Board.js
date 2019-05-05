const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [
    {
      taskName: {
        type: String,
        required: true
      },
      taskBody: {
        type: String,
        required: true
      }
    }
  ]
});

const Board = mongoose.model("board", boardSchema);

module.exports = Board;
