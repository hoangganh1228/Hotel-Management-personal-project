const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');

const roomSchema = new mongoose.Schema({ 
  name: String,
  room_category_id: {
    type: String,
    default: ""
  },
  roomNumber: Number,
  description: String,
  price: Number,
  discountPercentage: Number,
  quantity: Number,
  adult: Number,
  children: Number,
  thumbnail: String,
  stock: Number,
  images: [
    {
      type: String
    }
  ],
  room_facilities_id: [
    {
      type: String
    }
  ],
  room_features_id: [
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
  createdBy: {
    account_id: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  deleted: {
    type: Boolean,
    default: false,
    // unique: true
  },
  deletedBy: {
    account_id: String,
    deletedAt: Date
  },
  updatedBy: [
    {
      account_id: String,
      updatedAt: Date
    }
  ]
}, {
  timestamps: true
});
const Room = mongoose.model("Room", roomSchema, "rooms");

module.exports = Room;