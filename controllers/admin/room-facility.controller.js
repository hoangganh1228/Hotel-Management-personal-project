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

// [GET] /admin/rooms-facility/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  };


  res.render("admin/pages/rooms-facility/create", {
    pageTitle: "Tạo cơ sở vật chất"
  })
}

// [POST] /admin/rooms-facility/createPost
module.exports.createPost = async (req, res) => {
  if(req.body.position == "") {
    const count = await RoomFacility.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  
  const facility = new RoomFacility(req.body);
  await facility.save();
  
  res.redirect(`${systemConfig.prefixAdmin}/rooms-facility`);
}