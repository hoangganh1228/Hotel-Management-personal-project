const Room = require("../../models/room.model");

const filterStatusHelper  = require("../../helpers/filterStatus");

// [GET] /admin/rooms
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  const find = {
    deleted: false
  }
  
  if(req.query.status) {
    find.status = req.query.status
  }

  const rooms = await Room.find(find);

  // console.log(rooms);
  

  res.render("admin/pages/rooms/index", {
    pageTitle: "Trang phong",
    rooms: rooms,
    filterStatus: filterStatus,
  })
}