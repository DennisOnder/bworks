const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).send("No token provided");
  jwt.verify(
    token.replace("Bearer ", ""),
    config.SECRET_OR_KEY,
    (err, decoded) => {
      if (err) return res.status(401).send("Unauthorized");
      req.user = decoded;
      next();
    }
  );
};
