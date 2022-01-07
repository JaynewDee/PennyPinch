const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

// Employ morgan for helpful console logging of server events
app.use(logger("dev"));

// Configure express
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Initialize database connection
mongoose.connect("mongodb://localhost/pennyPinch", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// Routing
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`PennyPinch app running on port ${PORT}!`);
});