const RoomsFeatures = require("../../models/room-features.model");
const systemConfig = require("../../config/system");
// [GET] /admin/rooms-features/create

module.exports.create = async (req, res) => {
  res.render("admin/pages/rooms-features/create", {
    pageTitle: "Tạo cơ sở vật chất"
  })
}

// [GET] /admin/rooms-features/createPost
module.exports.createPost = async (req, res) => {
  
  const features = new RoomsFeatures(req.body);
  await features.save();

  res.redirect(`${systemConfig.prefixAdmin}/rooms-facility`);
}

// [DELETE] /admin/rooms-features/delete
module.exports.delete = async (req, res) => {
  const id = req.params.id;

  await RoomsFeatures.deleteOne({
    _id: id
  })

  res.json({
    code: 200,
    message: "Thanh cong!",
  })

}
