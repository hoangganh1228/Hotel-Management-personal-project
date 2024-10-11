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

// [GET] /vouchers/create
module.exports.createPost = async (req, res) => {
  const objectVoucher =  {
    code: req.body.code,
    discountValue: parseFloat(req.body.discountValue),  
    expirationDate: new Date(req.body.expirationDate),
    usageLimit: parseInt(req.body.usageLimit), 
    status: req.body.status,
    deleted: false,   
  }
  
  const voucher = new Voucher(objectVoucher);
  voucher.save();

  res.redirect(`${systemConfig.prefixAdmin}/vouchers`)
}