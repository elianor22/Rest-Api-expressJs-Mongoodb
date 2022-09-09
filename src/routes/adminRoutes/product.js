const express = require("express");
const router = express.Router();
const {
  Validation,
  checkItemValidation,
} = require("../../middleware/validation/Validator");

const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByName,
  deleteProduct,
  updateProduct,
  filterProductsByCategories,
  getProductCount,
  getProductFeatured,
  getAllProductSpesific,
} = require("../../controllers/adminControllers/productController");

// import middleware image
const {
  uploadMultiple,
  uploadSingle,
} = require("../../middleware/uploadImage/uploadImage");
const { validationResult, body } = require("express-validator");

router.route("/")
.post(uploadMultiple, createProduct)
.get(getAllProducts);

router.route("/get/count").get(getProductCount);
router.route('/get/featured/:count').get(getProductFeatured)
router.route("/get/spesific").get(getAllProductSpesific);

router
  .route("/:id")
  .get(getProductById)
  .put(uploadMultiple, updateProduct)
  .delete(deleteProduct);

router.route("/search/:name")
.get(getProductsByName);

router.route("/filter").get(filterProductsByCategories);

module.exports = router;
