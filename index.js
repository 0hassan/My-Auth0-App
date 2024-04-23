const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require("morgan");
const dotenv = require('dotenv');

const { auth } = require('express-oauth2-jwt-bearer');

dotenv.config();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// const jwtCheck = auth({
//   secret: "ugHZAgOlozet1VeZnttwC74m9FDBbCka",
//   audience: "tahirniacci@gmail.com",
//   issuerBaseURL: "https://dev-vk8f1oa2fnt1m70d.us.auth0.com/",
//   tokenSigningAlg: "HS256",
// });

// Routes

const routes = require('./routes');
app.use('/v1/', routes);

// Database connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.log('Database connection error', err);
	});

// Server
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
