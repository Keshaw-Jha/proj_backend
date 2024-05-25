const jwt = require("jsonwebtoken");
const config = require("../config.js");

const authenticateToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(403).json({
      status: "failed",
      message: "No authentication token found",
    });
  }
  const token = header.split(" ")[1];
  jwt.verify(token, config.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ status: "failed", message: "Forbidden" });
    }
    next();
  });
};

const authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error: Invalid token"));
    }
    socket.user = decoded;
    next();
  });
};

module.exports = { authenticateToken, authenticateSocket };
