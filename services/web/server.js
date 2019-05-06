const app = require("express")();
const bodyParser = require("body-parser");
const config = require("../../config/config");
const cors = require("cors");
const passport = require("passport");

// Apply middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require("../../config/passport");

// Server init
app.listen(config.WEB_SERVER_PORT, err => {
  if (err) process.exit(1);
  console.log(`Web Service running on port ${config.WEB_SERVER_PORT}...`);
});
