const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      street,
      city,
      country,
      zip,
    } = req.body;
    // console.log(email)
    const user = await new User({
      name,
      email,
      phone,
      password: bcrypt.hashSync(password, 10),
      street,
      city,
      country,
      zip,
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

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find().select("-password");

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).end("error can't get users");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId).select("-password");

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).end(`error can't get user ${userId}`);
  }
};

exports.getUserByName = async (req, res) => {
  try {
    const name = req.params.name;
    console.log(name);
    const user = await User.find({ name: { $regex: name, $options: "i" } }).select("-password");

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).end(`error can't get user ${usenamerId}`);
  }
};

exports.getUserCount = async (req, res) => {
  const user = await User.countDocuments()
  try {
    if(!user){
      res.status(400).send("user not found")
    }
    res.status(200).json({
      message:"success count all user",
      userCount:user
    })
  } catch (error) {
    res.status(400).json({
      message: "user not found",
      error
    });
  }
}

exports.userLogin = async (req, res) => {
  try {
    const {email,password} = req.body
    console.log(email)
    const user = await User.findOne({email})
    if(!user){
      res.status(400).send("user Not Found")
    }
    
    if (user && bcrypt.compareSync(password, user.password)) {
      /* if authentication valid
        then get the token
      */
     const secret = process.env.MY_SECRET
     const token = jwt.sign(
       {
         userId: user.id,
         isAdmin: user.isAdmin
       },
       //  and sencond input any string
       secret,
       {expiresIn:'1d'}
     );

      res.status(200).send({email: user.email, token: token});
    } else {
      res.status(400).send("wrong password");
    }
  } catch (error) {
    console.log(error)
  }
}
exports.userRegistration = async (req, res) => {
  try {
    const { name, email, phone, password, street, city, country, zip } =
      req.body;
    // console.log(email)
    const user = await new User({
      name,
      email,
      phone,
      password: bcrypt.hashSync(password, 10),
      street,
      city,
      country,
      zip,
    });

    const filter = await User.countDocuments({ email })
    console.log(filter)
      if (filter > 0) {
        
        res.status(400).end("email is already registered");
      } else {
        let saveUser = await user.save().then((doc) => {
          res.status(200).json({
            message: "success create new user",
            data: doc,
          });
        });
      }
  

  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id
    const { name, email, phone, street, city, country, zip } =
      req.body;
    // console.log(email)
    const user = {
      name,
      email,
      phone,
      street,
      city,
      country,
      zip,
    };

    const userUpdate = await User.findByIdAndUpdate(userId,user,{new:true})

    if(!userUpdate){
      res.status.send("Error User Not Found")
    }
    res.status(200).json(userUpdate)


  } catch (error) {
    console.log("error");
  }
};

exports.deleteUser = async(req,res) =>{
  const userId = req.params.id

  const user = await User.findByIdAndRemove(userId)

  if(!user){
    res.status(400).send("User Not Found")
  }
  res.status(200).send("success delete user")
}