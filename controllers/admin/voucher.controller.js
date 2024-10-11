const Voucher = require("../../models/voucher.model");

const systemConfig = require("../../config/system")

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