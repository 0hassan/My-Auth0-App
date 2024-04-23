const dotenv = require('dotenv');
dotenv.config();

const { requiresAuth } = require('express-openid-connect');

const auth = async (req, res, next) => {
	let accessToken = req.oidc.accessToken;
	console.log(accessToken);

	if (accessToken.isExpired()) {
		accessToken = await accessToken.refresh();
	}
	next();
};

module.exports = auth;
