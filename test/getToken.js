const apiCaller = require("./apiCaller");
const port = require("../config/config").AUTH_SERVER_PORT;

module.exports = async user => {
  const { data } = await apiCaller("post", port, "/auth/login", user);
  return data.token;
};
