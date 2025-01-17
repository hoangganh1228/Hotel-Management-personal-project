const Room = require("../../models/room.model");
const RoomCategory = require("../../models/room-category.model");
const RoomFacility = require("../../models/room-facility.model")
const RoomFeatures = require("../../models/room-features.model")
const Account = require("../../models/account.model");

const systemConfig = require("../../config/system")
const filterStatusHelper  = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

const createTreeHelper = require("../../helpers/createTree");   
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
  if(objectSearch.regex) {
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

  for(const room of rooms) {
    const user = await Account.findOne({
      _id: room.createdBy.account_id
    })

    if(user) {
      room.accountFullName = user.fullName
    }

    // Lấy ra thông tin người cập nhật gần nhất
    const updatedBy = room.updatedBy.slice(-1)[0];
    if(updatedBy) {
      const user = await Account.findOne({
        _id: updatedBy.account_id
      })
      
      updatedBy.accountFullName = user.fullName
    }
  }
  
  

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

  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date()
  }

  await Room.updateOne({
    _id: id
  }, {
    status: status,
    $push: { updatedBy: updatedBy }
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
  
  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date()
  }

  switch (type) {
    case "active":
      await Room.updateMany({ _id: { $in: ids } }, 
        { 
          status: "active",
          $push: { updatedBy: updatedBy } 
        })
      req.flash('success', `Cập nhật trạng thái thành công ${ids.length} phòng!`);
      break;
    case "inactive":
      await Room.updateMany({ _id: { $in: ids } }, 
        { 
          status: "inactive", 
          $push: { updatedBy: updatedBy }
        })
      req.flash('success', `Cập nhật trạng thái thành công ${ids.length} phòng!`);
      
      break;
    case "delete-all":
      await Room.updateMany({ _id: { $in: ids } }, {
        deleted: true,
        deletedBy: {
          account_id: res.locals.user.id,
          deletedAt: new Date()
        }
      })
      break
      
    case "change-position":
      for(const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Room.updateMany({ _id: id }, { 
          position: position,
          $push: { updatedBy: updatedBy }
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
    deletedBy: {
      account_id: res.locals.user.id,
      deletedAt: new Date()
    }
  })

  req.flash('success', `Đã xóa thành công sản phẩm!`);
  res.redirect("back")


}

// [GET] /admin/rooms/create
module.exports.create = async (req, res) => {
  
  let find = {
    deleted: false
  };
  const category = await RoomCategory.find(find);
  const facilities = await RoomFacility.find(find);
  const features = await RoomFeatures.find(find);

  const newCategory = createTreeHelper.tree(category);

  res.render("admin/pages/rooms/create", {
    pageTitle: "Thêm mới phòng",
    category: newCategory,
    facilities: facilities,
    features: features
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
  

  req.body.createdBy = {
    account_id: res.locals.user.id
  }

  const room = new Room(req.body);
  await room.save();

  res.redirect(`${systemConfig.prefixAdmin}/rooms`)
  
  // res.send("OK");
}

// [GET] /admin/rooms/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    };
    
    const facilities = await RoomFacility.find({
      deleted: false
    })

    const category = await RoomCategory.find({
      deleted: false
    });

    const features = await RoomFeatures.find({});

    const newCategory = createTreeHelper.tree(category);

    const room = await Room.findOne(find);

    res.render("admin/pages/rooms/edit", {
      pageTitle: "Chỉnh sửa phòng",
      room: room,
      category: newCategory,
      facilities: facilities,
      features: features
    });
  } catch (error) {
    req.flash("error", `Không tồn tại phòng này!`);

    res.redirect(`${systemConfig.prefixAdmin}/rooms`)
  }

}

module.exports.deleteImage = async (req, res) => {
  
  const { imageUrl, roomId } = req.body;

  try {
    await Room.updateOne({
      _id: roomId
    }, {
      $pull: { images: imageUrl }
    });

    req.flash("success", "Xóa ảnh thành công!");
  } catch (error) {
    req.flash("error", "Xóa ảnh thất bại!");
  }
  res.redirect("back");
}

// [PATCH] /admin/rooms/editPatch/:id
module.exports.editPatch = async (req, res) => {
  // console.log(req.body);
  
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  req.body.adult = parseInt(req.body.adult);
  req.body.children = parseInt(req.body.children);
  if (!req.body.room_facilities_id) {
    req.body.room_facilities_id = [];
  }
  
  if(req.body.images && req.body.images.length > 0) {
    req.body.thumbnail = req.body.images[0];  
  } 

  try {
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }

    await Room.updateOne({_id: id}, {
        ...req.body,
        $push: {
          updatedBy: updatedBy
        }
      } 
    )
    req.flash("success", `Cập nhật thành công sản phẩm!`);

  } catch (error) {
    req.flash("error", `Cập nhật thất bại!`);
  } 
  res.redirect(`${systemConfig.prefixAdmin}/rooms`)

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

