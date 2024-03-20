const { User } = require("../models");
const bcrypt = require("bcrypt");
var request = require("request");

const login = async (req, res) => {
  try {
    const user = req.oidc.user;
    console.log(user);
    res.status(200).json(req.oidc.user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  login,
  register,
  logout,
};
