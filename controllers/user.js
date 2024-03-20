const { User } = require("../models");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  res.status(200).json(req.oidc.user);
};

module.exports = {
  getAllUsers,
  getProfile,
};
