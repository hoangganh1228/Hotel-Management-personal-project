const Room = require("../../models/room.model")

// [GET] products/index
module.exports.index = async (req, res) => {
  res.render("client/pages/rooms/index", {
    pageTitle: "Trang phòng",
  })
}