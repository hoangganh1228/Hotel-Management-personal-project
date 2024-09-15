const RoomCategory = require("../../models/room-category.model")
const systemConfig = require("../../config/system")
const createTreeHelper = require("../../helpers/createTree")
// [GET] /admin/rooms-category/index
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }
  
  const records = await RoomCategory.find(find);

  const newRecords = createTreeHelper.tree(records);


  res.render("admin/pages/rooms-category/index", {
    pageTitle: "Trang danh mục sản phẩm",
    records: newRecords
  })
}

// [GET] /admin/rooms-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  }


  const records = await RoomCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/rooms-category/create", {
    pageTitle: "Tạo danh mục phòng",
    records: newRecords
  })
}   


// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if(req.body.position == "") {
    const count = await RoomCategory.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position)
  } 
  const record = new RoomCategory(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/rooms-category`)

}  