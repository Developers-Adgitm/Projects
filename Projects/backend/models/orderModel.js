const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
      min: 100000,
      max: 999999,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          // Regular expression to validate phone number format
          const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number format

          return phoneRegex.test(value);
        },
        message: "Invalid phone number format",
      },
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      requied: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    enum: [
      "Placed",
      "Processing",
      "Dispatched",
      "Delivered",
      "Cancelled",
      "Returned",
      "Rejected By Seller",
    ],
    default: "Placed",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
