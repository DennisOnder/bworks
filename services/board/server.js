const app = require("express")();
const database = require("../../config/database");
const applyMiddleware = require("../../middleware/applyMiddleware");
const verifyUser = require("../../middleware/verifyUser");
const {
  BOARD_DB_URI,
  BOARD_SERVER_PORT,
  API_VERSION
} = require("../../config/config");

// Apply middleware
applyMiddleware(app);
app.all("*", verifyUser);

// Database connection
database.connect(BOARD_DB_URI);

// Router
const routes = require(`./api/${API_VERSION}/board`);
app.use("/board", routes);

// Server
app.listen(BOARD_SERVER_PORT, err => {
  if (err) process.exit(1);
  console.log(`Board service running on port: ${BOARD_SERVER_PORT}`);
});
