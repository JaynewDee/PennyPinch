const express = require("express");
const logger = require("morgan");
const { connect } = require("mongoose");
const compression = require("compression");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

// Employ morgan for helpful console logging of server events
app.use(logger("dev"));

// Configure express
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Initialize database connection
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}).catch((err) => console.error(err));

// Routing
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`PennyPinch app running on port ${PORT}!`);
});
