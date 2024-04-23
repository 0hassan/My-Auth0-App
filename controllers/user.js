const { User } = require("../models");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    console.log(req.oidc.accessToken);

    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  console.log("/profile", req.openid.tokens.access_token);
  const user = req.openid.user;
  res.status(200).json(user);
};

module.exports = {
  getAllUsers,
  getProfile,
};
