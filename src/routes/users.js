var express = require('express');
var router = express.Router();
const {
  Validation,
  checkUser,
  checkUserLogin,
  
} = require("../middleware/validation/Validator");
const {
  createUser,
  getAllUser,
  getUserById,
  getUserByName,
  userLogin,
  userRegistration,
} = require("../controllers/userController");

/* GET users listing. */
router.get('/', getAllUser);

router.get("/:id", getUserById);
router.get("/search/:name",getUserByName)


/* POST users listing. */
router.post("/",Validation ,createUser);
router.post("/login",checkUserLogin,Validation ,userLogin);
router.post("/register", userRegistration);

module.exports = router;
