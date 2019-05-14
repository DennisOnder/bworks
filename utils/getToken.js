const apiCaller = require("./apiCaller");

module.exports = async user => {
  const { data } = await apiCaller("post", "/auth/login", user);
  return data.token;
};
