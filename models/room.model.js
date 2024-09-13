const mongoose = require("mongoose")

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
  status: String,
  position: Number,
  deleted: Boolean,
  deletedAt: Date
});
const Room = mongoose.model("Room", roomSchema, "rooms");

module.exports = Room;