const SettingGeneral = require("../../models/setting-general.model")

// [GET] /admin/settings/general
module.exports.index = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  res.render("admin/pages/settings/general", {
    pageTitle: "Trang cài đặt chung",
    settingGeneral: settingGeneral
  })
}

// [PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  
  const objectGeneral = {
    websiteName: req.body.websiteName,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    copyright: req.body.copyright,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    iframe: req.body.iframe,
    phone: req.body.phone,
  }

  if(settingGeneral) {
    await SettingGeneral.updateOne({
      _id: settingGeneral.id
    }, objectGeneral)
  } else {
    const record = new SettingGeneral(objectGeneral);
    record.save();
  }

  res.redirect("back");
}