const express = require("express");
const router = express.Router();
const { findAll, findOneById } = require("../controllers/product.controller");
router.get("/", findAll);
router.get("/:id", findOneById);
module.exports = router;
