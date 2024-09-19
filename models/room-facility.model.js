const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');

const roomFacilitySchema = new mongoose.Schema({ 
  title: String,
  icon: String,
  description: String,
  slug: { 
    type: String, 
    slug: "name",
  },
  position: Number,
  status: String,
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date
}, {
  timestamps: true
})

const RoomsFacility = mongoose.model("RoomFacility", roomFacilitySchema, "rooms-facility");
module.exports = RoomsFacility  ;   