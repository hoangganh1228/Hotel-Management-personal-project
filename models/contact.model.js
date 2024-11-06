const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    subject: String,
    message: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model("Contact", contactSchema, "contact");
module.exports = Contact;