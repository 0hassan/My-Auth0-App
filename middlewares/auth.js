const { auth } = require("express-openid-connect");
const dotenv = require("dotenv");
dotenv.config();

const config = {
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

module.exports.authentication = auth(config);
