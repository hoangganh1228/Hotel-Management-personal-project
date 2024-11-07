const User = require("../../models/user.model");
const Contact = require("../../models/contact.model");

const sendMailHelper = require("../../helpers/sendMail");

module.exports.index = async (req, res) => {
  const find = {
    deleted: "false"
  }
  const contacts = await Contact.find(find)
  res.render("admin/pages/contact/index", {
    pageTitle: "Quản lí thư",
    contacts: contacts
  })
}

module.exports.response = async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findOne({
    _id: id
  })
  
  
  res.render("admin/pages/contact/response", {
    pageTitle: "Phản hồi",
    contact: contact
  })
}

module.exports.responsePost = async (req, res) => {
  try {
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message
  
    sendMailHelper.sendMail(email, subject, message);
    req.flash("success", "Phản hồi thành công!")  
  } catch (error) {
    req.flash("error", "Phản hồi thất bại!")  
    
  }
  
  res.redirect("back");
}

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  
  await Contact.updateOne({
    _id: id
  }, {
    deleted: true
  })

  res.redirect("back")
}
