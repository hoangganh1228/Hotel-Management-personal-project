const mongoose = require("mongoose");


const roomFeaturesSchema = new mongoose.Schema({
  title: String,
  description: String,
  deleted: {
    type: Boolean,
    default: false,
  },
})

const RoomsFeatures = mongoose.model("RoomFeatures", roomFeaturesSchema, "rooms-features");
module.exports = RoomsFeatures;