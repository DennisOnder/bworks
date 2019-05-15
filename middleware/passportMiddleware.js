const passport = require("passport");

module.exports = {
  apply: expressApp => {
    expressApp.use(passport.initialize());
    require("../config/passport");
  }
};
