const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testUser = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
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
    }
  },
  {
    timestamps: true,
  }
);


const saveUser = mongoose.model("testUser", testUser);

module.exports = saveUser;
