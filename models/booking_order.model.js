const mongoose = require("mongoose")

const bookingOrderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true  
  }, 
  check_in: {
    type: Date,
    required: true
  },
  check_out: {
    type: Date,
    required: true
  },
  refund: {
    type: Boolean,
    default: false
  },
  booking_status: {
    type: String,
    enum: ['booked', 'pending', 'payment_failed'],
    default: 'pending'
  },
  trans_amt: {
    type: Number,
    default: 0
  },
  trans_status: {
    type: String
  },
  order_id: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  email: {
    type: String
  }
}, { timestamps: true });

const BookingOrder = mongoose.model("BookingOrder", bookingOrderSchema, "booking-orders");

module.exports = BookingOrder;