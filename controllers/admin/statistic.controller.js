const BookingOrder = require("../../models/booking_order.model");
const Room = require("../../models/room.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
  const { start, end } = req.query;
  if (!start && !end) {
    return res.render("admin/pages/statistic/index", {
      pageTitle: "Trang thống kê",
      overviewRevenue: JSON.stringify([]), 
      customerRevenue: JSON.stringify([]), 
      startDate: "", 
      endDate: "", 
    });
  }
  const startDate = start ? new Date(start) : new Date("2000-01-01");
  const endDate = end ? new Date(end) : new Date();
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];
  
  
  
  const roomRevenue = await BookingOrder.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        booking_status: "booked",
        trans_status: "Successful",
        trans_amt: { $gt: 0 }
      }
    },
    {
      $group: {
        _id: "$room_id",
        phong: { $sum: "$trans_amt" }
      }
    }
  ]);

  const roomIds = roomRevenue.map(item => item._id);
  const rooms = await Room.find({ _id: { $in: roomIds } }).select("name");

  const revenueEachRoom = roomRevenue.map((revenue) => {
    const room = rooms.find((room) => room._id.toString() === revenue._id.toString());
    return {
      roomName: room ? room.name : "Phòng không tồn tại",
      phong: revenue.phong,
    };
  });

  const customerRevenue = await BookingOrder.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        booking_status: "booked",
        trans_status: "Successful",
        trans_amt: { $gt: 0 }
      }
    },
    {
      $group: {
        _id: "$user_id",
        revenue: { $sum: "$trans_amt" },
      }
    }
  ]);

  const usersId = customerRevenue.filter((item) => item._id).map((item) => item._id);
  const users = await User.find({ _id: { $in: usersId } }).select("fullName email");

  const revenueEachUser = customerRevenue.map((revenue) => {
    if (!revenue._id) {
      return {
        customerName: "Khách chưa đăng nhập",
        customerEmail: "undefined",
        revenue: revenue.revenue,
      };
    }

    const user = users.find((user) => user._id.toString() === revenue._id.toString());
    return {
      customerName: user ? user.fullName : "Khách hàng không tồn tại",
      customerEmail: user ? user.email : "Khách hàng không tồn tại",
      revenue: revenue.revenue,
    };
  });

  res.render("admin/pages/statistic/index", {
    pageTitle: "Trang thống kê",
    overviewRevenue: JSON.stringify(revenueEachRoom),
    customerRevenue: JSON.stringify(revenueEachUser),
    startDate: formattedStartDate,
    endDate: formattedEndDate
  });

}

