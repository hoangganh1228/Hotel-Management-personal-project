module.exports.creatPost = (req, res, next) => {
  if(!req.body.name) {
    req.flash("error", `Vui lòng nhập tiêu đề!`);
    res.redirect("back")
    return;
  }
  next();
}

module.exports.editPatch = (req, res, next) => {
  if(!req.body.name) {
    req.flash("error", `Vui lòng nhập tiêu đề!`);
    res.redirect("back")
    return;
  }
  next();
}