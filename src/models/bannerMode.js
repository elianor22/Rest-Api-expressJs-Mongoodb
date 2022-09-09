const mongoose = require("mongoose")
const Schema = mongoose.Schema

const banner = new Schema({
    name:{
        type:String,
        required:true
    }
    ,
    image:{
        type:String,
        required:true
    }
})

category.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
  category.set("toJSON", {
    virtuals: true,
  });

module.exports = mongoose.model("banner",banner)