const mongoose = require("mongoose");
const reviewRatingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookingOrder",
      required: true 
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true  
    }, 
    message: String,
    rating: Number,
    review: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  {
    timestamps: true,
  }
);
const ReviewRating = mongoose.model("ReviewRating", reviewRatingSchema, "review-rating");
module.exports = ReviewRating;