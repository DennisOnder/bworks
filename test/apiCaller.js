const axios = require("axios");

module.exports = async (method, port, route, payload = null, token = null) => {
  try {
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
