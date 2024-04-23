const { User } = require('../models');
const bcrypt = require('bcrypt');
var request = require('request');

const login = async (req, res) => {
	try {
		console.log('login');
		res.oidc.login({
			returnTo: '/profile',
			authorizationParams: {
				redirect_uri: '/profile',
			},
		});
	} catch (err) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

const register = async (req, res) => {
	try {
		const user = req.oidc.user;
		console.log(user);
		// const salt = await bcrypt.genSalt(10);
		// const hashedPassword = await bcrypt.hash(, salt);
		const newUser = new User({
			name: user.name,
			email: user.email,
			// password: hashedPassword,
		});
		await newUser.save();
		res.status(201).json({ message: 'User created' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const logout = async (req, res) => {
	res.oidc.logout();
};

module.exports = {
	login,
	register,
	logout,
};
