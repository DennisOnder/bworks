const axios = require("axios");

module.exports = async (method, port, route, payload = null, token = null) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios[method](
      `http://localhost:${port}${route}`,
      payload
    );
    const { status, data } = await res;
    const result = { status, data };
    return result;
  } catch (error) {
    console.error(error);
  }
};
