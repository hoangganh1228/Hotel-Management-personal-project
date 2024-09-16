const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');

const roomSchema = new mongoose.Schema({ 
  name: String,
  roomNumber: Number,
  description: String,
  price: Number,
  discountPercentage: Number,
  quantity: Number,
  adult: String,
  children: String,
  thumbnail: String,
  stock: Number,
  images: [
    {
      type: String
    }
  ],
  status: String,
  position: Number,
  slug: { 
    type: String, 
    slug: "name",
    unique: true 
  },
  deleted: {
    type: Boolean,
    default: false,
    // unique: true
  },
  deletedAt: Date
}, {
  timestamps: true
});
const Room = mongoose.model("Room", roomSchema, "rooms");

module.exports = Room;