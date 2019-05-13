const axios = require("axios");
const config = require("../config/config");

module.exports = async (method, route, payload = null, token = null) => {
  try {
    const port = await config[
      `${route.split("/")[1].toUpperCase()}_SERVER_PORT`
    ];
    axios.defaults.headers.common["Authorization"] = token;
    const { status, data } = await axios[method](
      `http://localhost:${port}${route}`,
      payload
    );
    return { status, data };
  } catch (error) {
    console.error(error);
  }
};
