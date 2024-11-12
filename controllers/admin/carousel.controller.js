const Carousel = require("../../models/carousel.model")

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  const carousels = await Carousel.find(find);
  
  res.render("admin/pages/carousel/index", {
    pageTitle: "Quản lí đặt phòng",
    carousels: carousels
  })
}

module.exports.uploadPost = async(req, res) => {
  try {
    if(req.body.images && req.body.images.length > 0) {
      const carousel = new Carousel(req.body);
      carousel.save();
      req.flash("success", "Upload ảnh thành công!");
    }
  } catch (error) {
    req.flash("error", "Upload ảnh thất bại!");
  }
  
  res.redirect("back")
}

module.exports.delete = async (req, res) => {
  const { imageUrl } = req.body;

  try {
    await Carousel.updateOne(
      { images: imageUrl },
      { $pull: { images: imageUrl } }
    );

    req.flash("success", "Xóa ảnh thành công!");
  } catch (error) {
    req.flash("error", "Xóa ảnh thất bại!");
  }
  res.redirect("back");
}