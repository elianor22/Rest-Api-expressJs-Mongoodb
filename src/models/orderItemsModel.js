const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItems = new Schema({
  quantity: {
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
});

module.exports = mongoose.model("orderItems", orderItems);

