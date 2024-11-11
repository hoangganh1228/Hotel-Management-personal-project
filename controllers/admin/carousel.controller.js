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