const Form = require("../models/formModel");

const getTickets = async (req, res) => {
  try {
    const ticketsRecords = await Form.find({});
    res.status(200).json({
      status: "success",
      data: ticketsRecords,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const ActiveUsers = await Form.countDocuments({
      entryAt: { $exists: true },
      $and: [{ exitAt: { $exists: false } }, { exitAt: "" }],
    });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfToday = today;
    const endOfToday = new Date(today);
    endOfToday.setDate(endOfToday.getDate() + 1);
    const TicketsBooked = await Form.countDocuments({
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });
    const TotalExits = await Form.countDocuments({
      exitAt: { $exists: true },
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        activeUsers: ActiveUsers,
        ticketsBooked: TicketsBooked,
        totalExits: TotalExits,
        unvisited: TicketsBooked - (TotalExits + ActiveUsers),
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err,
    });
  }
};

module.exports = { getTickets, getDashboardStats };
