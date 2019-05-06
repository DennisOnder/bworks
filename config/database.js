const mongoose = require("mongoose");

module.exports = {
  connect: DB_URI => {
    mongoose.connect(DB_URI, { useNewUrlParser: true }, err => {
      if (err) process.exit(1);
    });
  }
};
