const express = require("express");
const router = express.Router();
const { addOrder } = require("../controllers/order.controller");
const { isLogin } = require("../middlewares/isLogin.middleware");

router.post("/", isLogin, addOrder);

module.exports = router;
