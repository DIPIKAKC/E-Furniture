import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        productName: String,
        price: Number,
        quantity: Number
      },
    ],
    totalPrice: Number,

    billingDetail: {
      address: String,
      phone: String,
      additionalInformation: String
    },

    paymentMethod: {
      type: String,
      enum: ["bank_transfer", "cash_on_delivery"],
      default: "cash_on_delivery"
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

