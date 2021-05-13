const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    images: {
      type: Array,
      default:''
    },
    description: {
      type: String,
      min: 10,
      required: true,
      
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default:0,
    },
    isFeatured:{
      type:Boolean,
      default:false
    },
    dateCreated:{
      type:Date,
      default:Date.now
    }
  },
  {
    timestamps: true,
  }
);

product.virtual('id').get(function(){
  return this._id.toHexString();
})

product.set('toJSON',{
  virtuals :true
})

const item = mongoose.model("product", product);
module.exports = item;
