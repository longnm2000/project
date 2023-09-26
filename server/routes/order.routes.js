const express = require("express");
const router = express.Router();
const {
  addOrder,
  findAllOrders,
  findOneOrderDetail,
  updateStatus,
  findAllOrdersByUserId,
} = require("../controllers/order.controller");
const { isLogin } = require("../middlewares/isLogin.middleware");

router.post("/", isLogin, addOrder);
router.get("/", findAllOrders);
router.get("/users/:id", findAllOrdersByUserId);
router.get("/:id", findOneOrderDetail);
router.patch("/:id", updateStatus);

module.exports = router;
