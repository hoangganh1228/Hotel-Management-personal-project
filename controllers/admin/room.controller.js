const Room = require("../../models/room.model");

const systemConfig = require("../../config/system")
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

  const rooms = await Room.find(find)
  .sort({ position: "desc"})
  .limit(objectPagination.limitItems)
  .skip(objectPagination.skip);
  
  // console.log(objectPagination);
  

  res.render("admin/pages/rooms/index", {
    pageTitle: "Trang phong",
    rooms: rooms,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  })
}

// [PATCH] /admin/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  
  const id = req.params.id;

  await Room.updateOne({
    _id: id
  }, {
    status: status
  })
  req.flash('success', `Cập nhật trạng thái thành công sản phẩm!`);

  res.json({
    code: 200,
    message: "Thanh cong!",
    status: status
  })
}

// [PATCH] /admin/rooms/change-multi/:status/:id
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Room.updateMany({ _id: { $in: ids } }, 
        { status: "active" })
      req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;
    case "inactive":
      await Room.updateMany({ _id: { $in: ids } }, 
        { status: "inactive" })
      req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      
      break;
    case "delete-all":
      await Room.updateMany({ _id: { $in: ids } }, {
        deleted: true,
        deletedAt: new Date()
      })
      
    case "change-position":
      for(const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Room.updateMany({ _id: id }, { 
          position: position
        })
        req.flash('success', `Đã thay đổi thành công vị trí của ${ids.length} sản phẩm!`);
      }
      
    default:
      break;
  }
  res.redirect("back")
}

// [DELETE] /admin/rooms/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Room.updateOne({
    _id: id
  }, {
    deleted: true,
    deletedAt: new Date()
  })

  res.json({
    code: 200,
    message: "Thanh cong!",

  })

}

// [GET] /admin/rooms/create
module.exports.create = async (req, res) => {

  res.render("admin/pages/rooms/create", {
    pageTitle: "Thêm mới phòng",
  })
}  

// [POST] /admin/products/create
module.exports.createPost = async(req, res) => {
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)

  if(req.body.position == "") {
    const countRooms = await Room.countDocuments();
    req.body.position = countRooms + 1;
  } else {
    req.body.position = parseInt(req.body.position)
  }

  const room = new Room(req.body);
  await room.save();

  res.redirect(`${systemConfig.prefixAdmin}/rooms`)
  

}