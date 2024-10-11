module.exports.createPost = (req, res, next) => {
  // if(!req.body.code) {
  //   req.flash("error", `Vui lòng nhập mã!`);
  //   res.redirect("back")
  //   return;
  // }
  // if(!req.body.expirationDate) {
  //   req.flash("error", `Vui lòng nhập ngày hết hạn!`);
  //   res.redirect("back")
  //   return;
  // }
  next();
}
