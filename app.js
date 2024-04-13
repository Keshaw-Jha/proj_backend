const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.options("*", cors());
// ROUTES
app.get(`/`, (req, res) => {
  res.send("Welcome to the backend");
});

app.use("", userRoutes);

module.exports = app;
