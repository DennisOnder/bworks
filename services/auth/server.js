const app = require("express")();
const database = require("../../config/database");
const applyMiddleware = require("../../middleware/applyMiddleware");
const passportMiddleware = require("../../middleware/passportMiddleware");
const {
  AUTH_DB_URI,
  AUTH_SERVER_PORT,
  API_VERSION
} = require("../../config/config");

// Apply middleware
applyMiddleware(app);
passportMiddleware.apply(app);

// Database connection
database.connect(AUTH_DB_URI);

// Router
const routes = require(`./api/${API_VERSION}/auth`);
app.use("/auth", routes);

// Server
app.listen(AUTH_SERVER_PORT, err => {
  if (err) process.exit(1);
  console.log(`Auth service running on port: ${AUTH_SERVER_PORT}`);
});
