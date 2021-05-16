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
  getUserCount,
  getUserByName,
  userLogin,
  userRegistration,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

/* GET users listing. */
router.get('/', getAllUser);
router.get("/get/count", getUserCount);
router.get("/:id", getUserById);
router.get("/search/:name",getUserByName)


/* POST users listing. */
router.post("/",Validation ,createUser);
router.post("/login",checkUserLogin,Validation ,userLogin);
router.post("/register", userRegistration);


/* PUT user listing */
router.put("/:id", updateUser);

/* DELETE User Listing*/

router.delete('/:id',deleteUser)

module.exports = router;
