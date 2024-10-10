const User = require("../../models/user.model");

const searchHelper = require("../../helpers/search");
const filterStatusHelper  = require("../../helpers/filterStatus");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  const filterStatus = filterStatusHelper(req.query);
  if(req.query.status) {
    find.status = req.query.status
  }
  const objectSearch = searchHelper(req.query);
  if(objectSearch.regex) {
    find.title = objectSearch.regex
  }

  const users = await User.find(find);
  res.render("admin/pages/users/index", {
    pageTitle: "Quản lí người dùng",
    users: users,
    keyword: objectSearch.keyword,
    filterStatus: filterStatus,
  });

}

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  
  await User.updateOne({
    _id: id
  }, {
    deleted: true
  })

  res.redirect("back")
}