const app = require("express")();
const config = require("../../config/config");
const database = require("../../config/database");
const routes = require(`./api/${config.API_VERSION}/auth`);
const applyMiddleware = require('../../config/applyMiddleware');

// Apply middleware
applyMiddleware(app);

// Database connection
database.connect(config.AUTH_DB_URI);

// Router init
app.use("/auth", routes);

// Server init
app.listen(config.AUTH_SERVER_PORT, err => {
  if (err) process.exit(1);
  console.log(`Auth service running on port: ${config.AUTH_SERVER_PORT}`);
});
