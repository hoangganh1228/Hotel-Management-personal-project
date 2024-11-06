const User = require("../../models/user.model");
const Contact = require("../../models/contact.model");


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

