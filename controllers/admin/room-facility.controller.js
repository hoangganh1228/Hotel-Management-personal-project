const RoomFacility = require("../../models/room-facility.model");
const systemConfig = require("../../config/system");

const filterStatusHelper  = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
// [GET] /admin/rooms-facility/index
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
  
  const countRoomsCategory = await RoomFacility.countDocuments(find);
  
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4
    },
    req.query,
    countRoomsCategory
  )

  const records = await RoomFacility.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
  res.render("admin/pages/rooms-facility/index", {
    pageTitle: "Trang danh mục sản phẩm",
    records: records,
    keyword: objectSearch.keyword,
    filterStatus: filterStatus,
    pagination: objectPagination
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

// [GET] /admin/rooms-facility/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const facility = await RoomFacility.findOne({
      _id: id
    });

    res.render("admin/pages/rooms-facility/edit", {
      pageTitle: "Trang danh mục sản phẩm",
      facility: facility
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/rooms-facility`); 
    
  }

  
}

// [PATCH] /admin/rooms-facility/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  

  req.body.position = parseInt(req.body.position)

  await RoomFacility.updateOne({ _id: id }, req.body);

  res.redirect(`${systemConfig.prefixAdmin}/rooms-facility`); 

  
}

// [DELETE] /admin/rooms-facility/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await RoomFacility.updateOne({
    _id: id
  }, {
    deleted: true
  })
  
  res.redirect(`${systemConfig.prefixAdmin}/rooms-facility`); 

  
}

// [GET] /admin/rooms-facility/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    };
    const facility = await RoomFacility.findOne(find);
    res.render("admin/pages/rooms-facility/detail", {
      pageTitle: facility.title,
      facility: facility  
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/rooms-facility`)
  }
}
