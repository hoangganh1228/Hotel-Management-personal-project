const Voucher = require("../../models/voucher.model");

const systemConfig = require("../../config/system")

// [GET] /vouchers
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  const vouchers = await Voucher.find(find);

  res.render("admin/pages/vouchers/index", {
    pageTitle: "Trang voucher",
    vouchers: vouchers
  })

}

// [GET] /vouchers/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/vouchers/create", {
    pageTitle: "Tạo voucher"
  })
}

// [POST] /vouchers/create
module.exports.createPost = async (req, res) => {
  const objectVoucher =  {
    code: req.body.code,
    discountValue: parseFloat(req.body.discountValue),  
    expirationDate: new Date(req.body.expirationDate),
    usageLimit: parseInt(req.body.usageLimit), 
    status: req.body.status,
  }
  
  const voucher = new Voucher(objectVoucher);
  voucher.save();

  res.redirect(`${systemConfig.prefixAdmin}/vouchers`)
}

// [GET] /vouchers/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  
  const voucher = await Voucher.findOne({
    _id: id
  });

  res.render("admin/pages/vouchers/edit", {
    pageTitle: "Chỉnh sửa voucher",
    voucher: voucher
  })
}

// [PATCH] /vouchers/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  const objectVoucher =  {
    code: req.body.code,
    discountValue: parseFloat(req.body.discountValue),  
    expirationDate: new Date(req.body.expirationDate),
    usageLimit: parseInt(req.body.usageLimit), 
    status: req.body.status,
  }

  await Voucher.updateOne({
    _id: id
  }, objectVoucher);

  
  res.redirect(`${systemConfig.prefixAdmin}/vouchers`)
}
