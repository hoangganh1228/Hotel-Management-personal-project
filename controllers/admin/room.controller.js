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

  // Pagination
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4
    },
    req.query,
    countRooms
  )

  // Sort
  let sort = {};
  if(req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else{
    sort.position = "desc"
  }


  const rooms = await Room.find(find)
  .sort(sort)
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
      req.flash('success', `Cập nhật trạng thái thành công ${ids.length} phòng!`);
      break;
    case "inactive":
      await Room.updateMany({ _id: { $in: ids } }, 
        { status: "inactive" })
      req.flash('success', `Cập nhật trạng thái thành công ${ids.length} phòng!`);
      
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
        req.flash('success', `Đã thay đổi thành công vị trí của ${ids.length} phòng!`);
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

// [POST] /admin/rooms/create
module.exports.createPost = async(req, res) => {
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock);
  req.body.adult = parseInt(req.body.adult);
  req.body.children = parseInt(req.body.children);
  if(req.body.images && req.body.images.length > 0) {
    req.body.thumbnail = req.body.images[0];  
  } 
  // console.log(req.body);
  
  if( req.body.position == "") {
    const countRooms = await Room.countDocuments();
    req.body.position = countRooms + 1;
  } else {
    req.body.position = parseInt(req.body.position)
  }

  const room = new Room(req.body);
  await room.save();

  res.redirect(`${systemConfig.prefixAdmin}/rooms`)
  

}

// [GET] /admin/rooms/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    };

    const room = await Room.findOne(find);

    res.render("admin/pages/rooms/edit", {
      pageTitle: "Chỉnh sửa phòng",
      room: room  
    });
  } catch (error) {
    req.flash("error", `Không tồn tại phòng này!`);

    res.redirect(`${systemConfig.prefixAdmin}/rooms`)
  }

}

// [PATCH] /admin/rooms/editPatch/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  req.body.adult = parseInt(req.body.adult);
  req.body.children = parseInt(req.body.children);
  // console.log(req.body);
  
  if(req.body.images && req.body.images.length > 0) {
    req.body.thumbnail = req.body.images[0];  
  } 

  try {
    await Room.updateOne({_id: id}, req.body)
    req.flash("success", `Cập nhật thành công sản phẩm!`);

  } catch (error) {
    req.flash("error", `Cập nhật thất bại!`);
  } 
  res.redirect("back")

}

// [GET] /admin/rooms/detail/:id
module.exports.detail = async (req, res) => {

  try {
    const find = {
      deleted: false,
      _id: req.params.id
    };

    const room = await Room.findOne(find);

    res.render("admin/pages/rooms/detail", {
      pageTitle: room.title,
      room: room  
    });
  } catch (error) {

    res.redirect(`${systemConfig.prefixAdmin}/rooms`)
  }

}