const { default: mongoose } = require("mongoose");
const app = require("./app.js");
const dotenv = require("dotenv");
const colors = require("ansi-colors");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log(`connected to ${colors.greenBright("DB")} 🌿`))
  .catch((err) => console.log(err));
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`app is running on port ${colors.greenBright(port)} 🖥️`);
});
