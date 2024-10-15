const md5 = require("md5");
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await Account.find(find).select("-password -token");

  for(const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    })
    record.role = role;
    
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
}

// [PATCH] /admin/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  
  const id = req.params.id;


  await Account.updateOne({
    _id: id
  }, {
    status: status,
  })
  req.flash('success', `Cập nhật trạng thái tài khoản thành công!`);

  res.json({
    code: 200,
    message: "Thanh cong!",
    status: status
  })
}


// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false
  });

  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles
  });
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false
  });

  if(emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);

    const record = new Account(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false,
  };

  try {
  
    const account = await Account.findOne(find)
  
    const roles = await Role.find({
      deleted: false
    });
  
    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      account: account,
      roles: roles
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  const emailExist = await Account.findOne({
    _id: { $ne: id },
    deleted: false,
    email: req.body.email
  })

  if(emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
  } else {
    if(req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    await Account.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật tài khoản thành công!");
  }

  res.redirect("back");
}

// [GET] /admin/accounts/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  
  await Account.updateOne({
    _id: id
  }, {
    deleted: true
  })

  res.redirect("back");
}

