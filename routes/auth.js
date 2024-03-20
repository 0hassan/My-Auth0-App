const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth");

const { auth, requiresAuth } = require("express-openid-connect");

const { authController } = require("../controllers");
const { userController } = require("../controllers");

router.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
  })
);

router.post("/register", authController.register);
router.get("/", authController.login);

router.get("/user", requiresAuth(), userController.getAllUsers);
router.get("/profile", requiresAuth(), userController.getProfile);

module.exports = router;
