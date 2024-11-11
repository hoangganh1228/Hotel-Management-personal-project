const BookingOrder = require("../../models/booking_order.model");

module.exports.index = async (req, res) => {
  const bookings = await BookingOrder.find({})
    .populate({
      path: "room_id",
      select: 'id name price'
    })
    .populate({
      path: "user_id",
      select: "id fullName phone"
    })

    res.render("admin/pages/bookings/index", {
      pageTitle: "Quản lí đặt phòng",
      bookings: bookings
    })

}

module.exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    await BookingOrder.deleteOne({
      _id: id
    })
    req.flash("success", 'Hủy đặt phòng thành công!')
  } catch (error) {
    req.flash("error", 'Hủy đặt phòng thất bại!')
  }
  
  res.redirect("back");
  
}