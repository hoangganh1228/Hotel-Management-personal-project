const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },
  discountValue: {
    type: Number,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: 1
  },
  slug: {
    type: String,
    slug: "code",
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'used', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
}, {
  timestamps: true
})

const Voucher = mongoose.model("Voucher", voucherSchema, "vouchers");

module.exports = Voucher;