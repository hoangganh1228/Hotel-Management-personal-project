module.exports.createPost = (req, res, next) => {
  if(!req.body.code) {
    req.flash("error", `Vui lòng nhập mã!`);
    res.redirect("back")
    return;
  }
  if(!req.body.expirationDate) {
    req.flash("error", `Vui lòng nhập ngày hết hạn!`);
    res.redirect("back")
    return;
  }
  next();
}

module.exports.editPatch = (req, res, next) => {
  if(!req.body.code) {
    req.flash("error", `Vui lòng nhập mã!`);
    res.redirect("back")
    return;
  }
  if(!req.body.discountValue) {
    req.flash("error", `Vui lòng nhập giá trị giảm giá!`);
    res.redirect("back")
    return;
  }
  if(!req.body.expirationDate) {
    req.flash("error", `Vui lòng nhập ngày hết hạn!`);
    res.redirect("back")
    return;
  }
  if(!req.body.usageLimit) {
    req.flash("error", `Vui lòng nhập giới hạn số lần sử dụng!`);
    res.redirect("back")
    return;
  }
  next();
}

