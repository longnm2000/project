const express = require("express");
const router = express.Router();
const { findAll, findOneById } = require("../controllers/product.controller");
const { isLogin } = require("../middlewares/isLogin.middleware");

router.get("/", findAll);
router.get("/:id", findOneById);
module.exports = router;
