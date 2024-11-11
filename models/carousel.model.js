const mongoose = require("mongoose");
const carouselSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String
      }
    ],
    deleted: {
      type: Boolean,
      default: false,
    } 
  }
);
const Carousel = mongoose.model("carousel", carouselSchema, "carousels");
module.exports = Carousel;