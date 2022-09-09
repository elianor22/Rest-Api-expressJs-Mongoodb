const User = require("../../models/testUserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
     
    } = req.body;
    // console.log(email)
    const user = await new User({
      firstName,
      lastName,
      email,
      phone,
      password: bcrypt.hashSync(password, 10),
      
    });

    const filter = User.countDocuments({ email }).then((doc) => {
      if (doc > 1) {
        res.status(400).end("error");
      } else {
        let saveUser = user.save().then((doc) => {
          res.status(200).json({
            message: "success create new user",
            data: doc,
          });
        });
        return saveUser
      }
    });

    // console.log(filter);
    // let saveUser = await user.save();
    // res.status(200).json({
    //   message: "success create new user",
    //   data: saveUser,
    // });
  } catch (error) {
    console.log("error");
  }
};