const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signupProcess = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({ message: "User registered successfully", token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginProcess = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User Logged in Successfully", token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupProcess, loginProcess };
