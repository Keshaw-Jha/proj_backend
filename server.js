import mongoose from "mongoose";
import app from "./app";

app.get(`/`, (req, res) => {
  res.send("welcome to the starter project");
});

const server = app.listen(3000, () => {
  console.log(`app is running in port 3000`);
});
