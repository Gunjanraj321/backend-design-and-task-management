const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

module.exports = async (req, res, next) => {
  const token = req.header("token");
  try {
    const userID = jwt.verify(token, process.env.JWTSECRET);
    const user = await User.findById(userID.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "token expired or mulformed" });
  }
};
