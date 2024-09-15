const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const roomCategorySchema = new mongoose.Schema({
  title: String,
  parent_id: {
    type: String,
    default: "",
  },
  description: String,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug: { 
    type: String, 
    slug: "name",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date
}, {
  timestamps: true
})

const RoomsCategory = mongoose.model("RoomCategory", roomCategorySchema, "rooms-category");

module.exports = RoomsCategory;   