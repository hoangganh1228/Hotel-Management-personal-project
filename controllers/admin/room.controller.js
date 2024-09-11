const Room = require("../../models/room.model");

// [GET] /admin/rooms
module.exports.index = async (req, res) => {
  // const find = {
  //   deleted: false
  // }
  const rooms = await Room.find({});

  console.log(rooms);
  

  res.render("admin/pages/rooms/index", {
    pageTitle: "Trang phong",
    rooms: rooms
  })
}