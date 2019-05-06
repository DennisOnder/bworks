const app = require("express")();
const bodyParser = require("body-parser");
const config = require("../../config/config");
const cors = require("cors");
const database = require("../../config/database");
const passport = require("passport");
const routes = require(`./api/${config.API_VERSION}/board`);

// Apply middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require("../../config/passport");

// Database connection
database.connect(config.BOARD_DB_URI);

// Router init
app.use("/board", routes);

// Server init
app.listen(config.BOARD_SERVER_PORT, err => {
  if (err) process.exit(1);
  console.log(`Board service running on port ${config.BOARD_SERVER_PORT}...`);
});
