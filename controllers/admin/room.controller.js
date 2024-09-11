const Room = require("../../models/room.model");

// [GET] /admin/rooms
module.exports.index = async (req, res) => {
  res.render("admin/pages/rooms/index", {
    pageTitle: "Trang phong"
  })
}