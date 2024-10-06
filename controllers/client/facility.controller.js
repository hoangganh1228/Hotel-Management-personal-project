const RoomFacility = require("../../models/room-facility.model")
const Room = require("../../models/room.model")


module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
    status: "active"
  }
  const facilities = await RoomFacility.find(find);

  res.render("client/pages/facilities/index", {
    pageTitle: "Trang dịch vụ",
    facilities: facilities
  })
}