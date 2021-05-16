const express = require("express");
const router = express.Router();


// import controllers
const {
  createOrder,
  getAllOrder,
  getOrderById,
  getTotalSales,
  updateOrder,
  deleteOrder,
  getUserOrder,
} = require("../controllers/orderController");

/*Router "/" Listing */
router.route("/")
.post(createOrder)
.get(getAllOrder)
.get(getOrderById);

/*Router "/:id" Listing */
router.route("/:id")
.get(getOrderById)
.put(updateOrder)
.delete(deleteOrder);

router.route("/get/userorderlist/:userId").get(getUserOrder);

router.route("/get/totalsales").get(getTotalSales);



module.exports = router;