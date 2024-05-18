const config = require("./config.js");
const { default: mongoose } = require("mongoose");
const app = require("./app.js");
const colors = require("ansi-colors");

const DB = config.DATABASE.replace("<password>", config.DATABASE_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log(`connected to ${colors.greenBright("DB")} 🌿`))
  .catch((err) => console.log(err));
const port = config.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`app is running on port ${colors.greenBright(port)} 🖥️`);
});
