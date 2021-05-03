const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Items = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categories: {
      categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
      category:{
        type:String
      }
    },
    photo: {
      type: Array,
      equired: true,
    },
    description: {
      type: String,
      min:10,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const item = mongoose.model('items',Items)
module.exports = item