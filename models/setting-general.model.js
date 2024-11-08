const mongoose = require("mongoose");

const settingGeneralSchema = new mongoose.Schema(
  {
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String,
    facebook: String, 
    instagram: String,
    twitter: String,
    iframe: String,
    gmap: String,
    venue: String,
    phone: String,
    introduction: String
  },
  {
    timestamps: true,
  }
);

const SettingGeneral = mongoose.model("SettingGeneral", settingGeneralSchema, "settings-general");

module.exports = SettingGeneral;