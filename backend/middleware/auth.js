const User = require("../models/User");
const jwt = require("jsonwebtoken");
exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    console.log(req.cookies.token);
    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
