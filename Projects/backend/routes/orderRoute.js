const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  updateOrder,
  deleteOrder,
  getAllOrders,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
