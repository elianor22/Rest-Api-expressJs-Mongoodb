const mongoose = require("mongoose")

const Schema = mongoose.Schema

const order = new Schema(
  {
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "orderItems",
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      // required: true,
    },
    statusOrder: {
      type: String,
      required: true,
      default: "PENDING",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    dateOrdered:{
      type: Date,
      default:Date.now
    }
  },
  {
    timestamps: true,
  }
);

order.virtual("id").get( ()=>{
  return this._id.toHexString()
})

order.set("JSON",{ virtuals: true})

const saveOrder = mongoose.model("order",order)
module.exports = saveOrder

