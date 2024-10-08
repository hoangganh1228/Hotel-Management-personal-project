const RoomCategory = require("../../models/room-category.model")
const systemConfig = require("../../config/system")
const filterStatusHelper  = require("../../helpers/filterStatus");
const createTreeHelper = require("../../helpers/createTree")
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
// [GET] /admin/rooms-category/index
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }
  
  const filterStatus = filterStatusHelper(req.query);
  if(req.query.status) {
    find.status = req.query.status
  }
  
  // Tìm kiếm
  const objectSearch = searchHelper(req.query);
  
  if(objectSearch.regex) {
    find.title = objectSearch.regex
  }

  // console.log(find);
  

  const countRoomsCategory = await RoomCategory.countDocuments(find);
  
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4
    },
    req.query,
    countRoomsCategory
  )
  
  const records = await RoomCategory.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
  
  const newRecords = createTreeHelper.tree(records);
  // console.log(newRecords);
  
  

  res.render("admin/pages/rooms-category/index", {
    pageTitle: "Trang danh mục sản phẩm",
    records: newRecords,
    keyword: objectSearch.keyword,
    filterStatus: filterStatus,
    pagination: objectPagination
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
    records: newRecords,
  })
}   

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  const permissions = res.locals.role.permissions
  
  if(permissions.includes("rooms-category_create")) {
    if(req.body.position == "") {
      const count = await RoomCategory.countDocuments();
      req.body.position = count + 1;
    } else {
      req.body.position = parseInt(req.body.position)
    } 
    const record = new RoomCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/rooms-category`)
  } else {
    res.send("403");
    return; 
  }


}  

// [GET] /admin/rooms-category/edit/:id
module.exports.edit = async (req, res) => {
  
  try {
    const id = req.params.id;
    const data = await RoomCategory.findOne({
      _id: id,
      deleted: false
    })


    const records = await RoomCategory.find({
      deleted: false
    });

    const newRecords = createTreeHelper.tree(records);
    
    res.render("admin/pages/rooms-category/edit", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      data: data,
      records: newRecords
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/rooms-category`); 
  }
}

// [PATCH] /admin/rooms-category/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  

  req.body.position = parseInt(req.body.position)

  await RoomCategory.updateOne({ _id: id }, req.body);

  res.redirect("back")
}

// [DELETE] /admin/rooms-category/edit/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;

  await RoomCategory.updateOne({
    _id: id
  }, {
    deleted: true
  })

  res.redirect("back")
}

// [GET] /admin/rooms-category/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    };
    const category = await RoomCategory.findOne(find);
    res.render("admin/pages/rooms-category/detail", {
      pageTitle: category.title,
      category: category  
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/rooms-category`)
  }
}
