const config = require("./config.js");
const { default: mongoose } = require("mongoose");
const app = require("./app.js");
const colors = require("ansi-colors");
const { sendAlerts } = require("./cron/sendAlert.js");
const schedule = require("node-schedule");
const { deleteOldRecords } = require("./utils/refreshService.js");
const http = require("http");
const { authenticateSocket } = require("./middlewares/authenticateToken.js");
const { getDashboardStats } = require("./utils/dashboardStats.js");

const DB = config.DATABASE.replace("<password>", config.DATABASE_PASSWORD);
const port = config.PORT || 3001;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
  transports: ["polling", "websocket"], // Allow both transports
  allowEIO3: true, // Enable support for older clients if needed
});

const cronJob = () =>
  schedule.scheduleJob("*/5 * * * *", function () {
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

// io.use(authenticateSocket); // Uncomment this if you need to authenticate socket connections

io.on("connection", (socket) => {
  console.log("a user connected");

  // Emit initial stats on connection
  emitDashboardStats();

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // Handle socket errors
  socket.on("error", (err) => {
    console.log("Socket error:", err);
  });
});

const emitDashboardStats = async () => {
  try {
    const stats = await getDashboardStats();
    if (stats) {
      io.emit("dashboardStats", stats);
    }
  } catch (error) {
    console.error("Failed to get dashboard stats:", error);
  }
};

// Emit dashboard stats every 5 seconds
setInterval(emitDashboardStats, 3000);

server.listen(port, () => {
  console.log(`app is running on port ${colors.greenBright(port)} 🖥️`);
});
