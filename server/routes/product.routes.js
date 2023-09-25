const express = require("express");
const router = express.Router();
const {
  findAll,
  findOneById,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/", findAll);
router.get("/:id", findOneById);
router.delete("/:id", deleteProduct);
module.exports = router;
