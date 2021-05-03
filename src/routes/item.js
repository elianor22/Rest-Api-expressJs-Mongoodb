const express = require("express");
const router = express.Router();
const {
  Validation,
  checkItemValidation,
} = require("../middleware/validation/Validator");

const {
  createItem,
  getAllItems,
  getItemsByName,
  deleteItem,
  updateItems,
} = require("../controllers/itemController");

// import middleware image
const {
  uploadMultiple,
  uploadSingle,
} = require("../middleware/uploadImage/uploadImage");
const { validationResult, body } = require("express-validator");

router.route("/")
.post(uploadMultiple, createItem)
.get(getAllItems);

router.route("/:id").delete(deleteItem).put(uploadMultiple,updateItems);

router.route("/search/:name")
.get(getItemsByName);

module.exports = router;
