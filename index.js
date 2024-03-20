const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { auth } = require("express-openid-connect");

dotenv.config();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
const routes = require("./routes");
app.use("/", routes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });

// Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
