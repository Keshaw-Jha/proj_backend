const config = require("./config.js");
const { default: mongoose } = require("mongoose");
const app = require("./app.js");
const colors = require("ansi-colors");
const { sendAlerts } = require("./cron/sendAlert.js");
const schedule = require("node-schedule");

const DB = config.DATABASE.replace("<password>", config.DATABASE_PASSWORD);

const cronjob = () =>
  schedule.scheduleJob("*/5   *    *    *    *", function () {
    sendAlerts();
  });

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connected to ${colors.greenBright("DB")} 🌿`);
    cronjob(); // cron job call
  })
  .catch((err) => console.log("server error", err));
const port = config.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`app is running on port ${colors.greenBright(port)} 🖥️`);
});
