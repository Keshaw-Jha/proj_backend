const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(403).json({
      status: "failed",
      message: "No authentication token found",
    });
  }
  const token = header.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ status: "failed", message: "Forbidden" });
    }
    next();
  });
};

module.exports = { authenticateToken };
