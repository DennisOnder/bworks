const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

module.exports = expressApp => {
  expressApp.use(cors());
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({
    extended: false
  }));
  expressApp.use(passport.initialize());
  require("./passport");
}