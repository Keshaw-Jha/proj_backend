const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.options("*", cors());
// ROUTES
app.get(`/`, (req, res) => {
  res.send(`<h1>Welcome to the backend</h1>`);
});

app.use("", userRoutes);

module.exports = app;
