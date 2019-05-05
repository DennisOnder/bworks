require("dotenv").config();

module.exports = {
  SECRET_OR_KEY: process.env.SECRET_OR_KEY,
  AUTH_SERVER_PORT: process.env.AUTH_SERVER_PORT,
  BOARD_SERVER_PORT: process.env.BOARD_SERVER_PORT,
  WEB_SERVER_PORT: process.env.WEB_SERVER_PORT,
  AUTH_DB_URI: process.env.AUTH_DB_URI,
  BOARD_DB_URI: process.env.BOARD_DB_URI
};
