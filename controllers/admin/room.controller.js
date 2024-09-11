const Room = require("../../models/room.model");

const filterStatusHelper  = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
// [GET] /admin/rooms
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  const find = {
    deleted: false
  }

  if(req.query.status) {
    find.status = req.query.status
  }

  // Tìm kiếm
  const objectSearch = searchHelper(req.query);
  if(objectSearch) {
    find.title = objectSearch.regex
  }

  const countRooms = await Room.countDocuments(find)

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4
    },
    req.query,
    countRooms
  )

  const rooms = await Room.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip );
  
  // console.log(objectPagination);
  

  res.render("admin/pages/rooms/index", {
    pageTitle: "Trang phong",
    rooms: rooms,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  })
}