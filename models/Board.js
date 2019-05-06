const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lists: [
    {
      listName: {
        type: String,
        required: true
      },
      tasks: [
        {
          taskBody: {
            type: String,
            required: true
          }
        }
      ]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Board = mongoose.model("board", boardSchema);

module.exports = Board;
