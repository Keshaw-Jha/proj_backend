const Form = require("../models/formModel");

const getDashboardStats = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfToday = today;
    const endOfToday = new Date(today);
    endOfToday.setDate(endOfToday.getDate() + 1);
    const ActiveUsers = await Form.countDocuments({
      entryAt: { $exists: true },
      $and: [{ exitAt: { $exists: false } }, { exitAt: "" }],
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });
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
    return {
      activeUsers: ActiveUsers,
      ticketsBooked: TicketsBooked,
      totalExits: TotalExits,
      unvisited: TicketsBooked - (TotalExits + ActiveUsers),
    };
  } catch (err) {
    console.error("Failed to fetch dashboard stats:", err);
    return null;
  }
};

module.exports = {
  getDashboardStats,
};
