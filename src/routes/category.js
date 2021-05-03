const express = require("express");
const router = express.Router();
const {
  Validation,
  checkCategoryValidation,
} = require("../middleware/validation/Validator");
// const { check, validationResult } = require("express-validator");

const {
  getAllCategory,
  createCategory,
  deleteCategory,
  getCategoryById,
  searchCategory,
  updateCategory,
} = require("../controllers/categoryController");

router
  .route("/")
  .get(getAllCategory)
  .post(checkCategoryValidation, Validation, createCategory);

router
  .route("/:id")
  .get(getCategoryById)
  .put(checkCategoryValidation, Validation, updateCategory)

  .delete(deleteCategory);

router.route("/search/:name")
  .get(searchCategory);

module.exports = router;
