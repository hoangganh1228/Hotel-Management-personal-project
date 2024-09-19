const RoomFacility = require("../../models/room-facility.model");
const systemConfig = require("../../config/system")

// [GET] /admin/rooms-facility/index
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await RoomFacility.find(find);
  res.render("admin/pages/rooms-facility/index", {
    pageTitle: "Trang danh mục sản phẩm",
    records: records,
    // keyword: objectSearch.keyword,
    // filterStatus: filterStatus,
    // pagination: objectPagination
  })
}