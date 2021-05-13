const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    street: {
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
    isAdmin:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

user.virtual("id").get(function () {
  return this._id.toHexString();
});
user.set("toJSON", { virtuals: true });

const saveUser = mongoose.model("user", user);

module.exports = saveUser;
