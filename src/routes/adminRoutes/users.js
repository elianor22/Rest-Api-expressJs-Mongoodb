var express = require('express');
var router = express.Router();
const {
  Validation,
  checkUser,
  checkUserLogin,
  
} = require("../../middleware/validation/Validator");
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
  userLogout,
} = require("../../controllers/adminControllers/userController");

const testUser = require("../../controllers/adminControllers/testUser")

/* GET users listing. */
router.get('/', getAllUser);
router.get("/get/count", getUserCount);
router.get("/:id", getUserById);
router.get("/search/:name",getUserByName)
router.get("/userLogout", userLogout);


/* POST users listing. */
router.post("/",Validation ,createUser);
router.post("/login",checkUserLogin,Validation ,userLogin);
router.post("/register", userRegistration);
router.post("/test/register", testUser.createUser);


/* PUT user listing */
router.put("/:id", updateUser);

/* DELETE User Listing*/

router.delete('/:id',deleteUser)

module.exports = router;
