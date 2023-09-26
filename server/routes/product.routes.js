const express = require("express");
const router = express.Router();
const {
  findAll,
  findOneById,
  deleteProduct,
  findAllManufacturers,
  addProduct,
  deleteManufacturer,
  addManufacturer,
  findOneManufacturer,
  updateManufacturer,
  updateProduct,
} = require("../controllers/product.controller");

router.get("/", findAll);
router.get("/manufacturers/:id", findOneManufacturer);
router.get("/manufacturers", findAllManufacturers);
router.patch("/manufacturers/:id", updateManufacturer);
router.patch("/:id", updateProduct);
router.delete("/manufacturers/:id", deleteManufacturer);
router.get("/:id", findOneById);
router.delete("/:id", deleteProduct);
router.post("/manufacturers", addManufacturer);
router.post("/", addProduct);
module.exports = router;
