const Room = require("../../models/room.model");
const RoomCategory = require("../../models/room-category.model");
const Account = require("../../models/account.model");
const User = require("../../models/user.model");
const RoomFacility = require("../../models/room-facility.model");


module.exports.dashboard = async (req, res) => {
  const statistic = {
    categoryRoom: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    room: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    account: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    user: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    features: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    facility: {
      total: 0,
      active: 0,
      inactive: 0,
    }
  };

  statistic.categoryRoom.total = await RoomCategory.countDocuments({
    deleted: false
  });

  statistic.categoryRoom.active = await RoomCategory.countDocuments({
    status: "active",
    deleted: false
  });

  statistic.categoryRoom.inactive = await RoomCategory.countDocuments({
    status: "inactive",
    deleted: false
  });

  //2
  statistic.room.total = await Room.countDocuments({
    deleted: false
  });

  statistic.room.active = await Room.countDocuments({
    deleted: false,
    status: "active"
  });

  statistic.room.inactive = await Room.countDocuments({
    status: "inactive",
    deleted: false
  });

  //3
  statistic.account.total = await Account.countDocuments({
    deleted: false
  });
  statistic.account.active = await Account.countDocuments({
    status: "active",
    deleted: false
  });
  statistic.account.inactive = await Account.countDocuments({
    status: "inactive",
    deleted: false
  });

  //4
  statistic.user.total = await User.countDocuments({
    deleted: false
  });
  statistic.user.active = await User.countDocuments({
    status: "active",
    deleted: false
  });
  statistic.user.inactive = await User.countDocuments({
    status: "inactive",
    deleted: false
  });

  //5
  statistic.facility.total = await RoomFacility.countDocuments({
    deleted: false
  });
  statistic.facility.active = await RoomFacility.countDocuments({
    status: "active",
    deleted: false
  });
  statistic.facility.inactive = await RoomFacility.countDocuments({
    status: "inactive",
    deleted: false
  });


  res.render("admin/pages/dashboard/index", {
    pageTitle: "Trang tổng quan",
    statistic: statistic
  });
}