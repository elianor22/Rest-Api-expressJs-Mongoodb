const mongoose = require('mongoose');
const Schema = mongoose.Schema

const category = new Schema({
    name:{
        type:String,
        required:true
    },
    // photo:{
    //     type:String
    // }
    products:[{
        type: Schema.Types.ObjectId,
        ref:"product"
    }]

},{
    timestamps: true
})


category.virtual("id").get(function () {
  return this._id.toHexString();
});

category.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model('category',category)