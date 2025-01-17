const User = require("../../models/user.model");
const Contact = require("../../models/contact.model");

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

module.exports.contactPost = async (req, res) => {
  const objectContact = {
    fullName: req.body.fullName,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  }

  const contact = new Contact(objectContact);
  contact.save();

  res.redirect("back");
}