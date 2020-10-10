const JWT = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({
      message: "Access Denied!, no token entered",
    });

  try {
    const verified = JWT.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({
      error: "Auth failed! Check auth token",
    });
  }
};
