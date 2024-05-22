const config = require("./config.js");
const { default: mongoose } = require("mongoose");
const app = require("./app.js");
const colors = require("ansi-colors");
const { sendAlerts } = require("./cron/sendAlert.js");
const schedule = require("node-schedule");
const { deleteOldRecords } = require("./utils/refreshService.js");
const http = require("http");

const { getDashboardStats } = require("./utils/dashboardStats.js");

const DB = config.DATABASE.replace("<password>", config.DATABASE_PASSWORD);
const port = config.PORT || 3001;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const cronJob = () =>
  schedule.scheduleJob("*/5  *   *    *    *    *", function () {
    sendAlerts();
  });

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connected to ${colors.greenBright("DB")} 🌿`);
    cronJob();
    deleteOldRecords(); // cron job call
  })
  .catch((err) => console.log("server error", err));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const emitDashboardStats = async () => {
  const stats = await getDashboardStats();
  if (stats) {
    io.emit("dashboardStats", stats);
  }
};

setInterval(emitDashboardStats, 3000);

server.listen(port, () => {
  console.log(`app is running on port ${colors.greenBright(port)} 🖥️`);
});
