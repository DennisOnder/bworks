const app = require("express")();
const { WEB_SERVER_PORT } = require("../../config/config");
const applyMiddleware = require("../../middleware/applyMiddleware");

// Apply middleware
applyMiddleware(app);

// Server
app.listen(WEB_SERVER_PORT, err => {
  if (err) process.exit(1);
  console.log(`Web Service running on port: ${WEB_SERVER_PORT}`);
});
