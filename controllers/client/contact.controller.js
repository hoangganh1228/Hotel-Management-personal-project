const User = require("../../models/user.model");


module.exports.index = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;

  const user = await User.findOne({
    tokenUser: tokenUser
  })

  
  
  res.render("client/pages/contact/index", {
    pageTitle: "Trang liên hệ",
    user: user 
  })
}