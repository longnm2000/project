const express = require("express");
const router = express.Router();
const {
  findAll,
  findOneById,
  deleteProduct,
  findAllManufacturers,
} = require("../controllers/product.controller");

router.get("/", findAll);
router.get("/manufacturers", findAllManufacturers);
router.get("/:id", findOneById);
router.delete("/:id", deleteProduct);
module.exports = router;
