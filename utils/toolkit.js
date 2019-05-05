module.exports = {
  response(statusCode, message) {
    if (typeof message === "object" || Array.isArray(message)) {
      return message;
    } else {
      if (statusCode === 200) {
        return {
          success: message
        };
      } else {
        return {
          error: message
        };
      }
    }
  },
  handler(
    responseObject,
    statusCode,
    data,
    _super = false,
    requestObject = false
  ) {
    responseObject.status(statusCode).json(this.response(statusCode, data));
    if (_super) {
      console.log("Admin stuff");
    }
  }
};
