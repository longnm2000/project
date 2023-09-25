const express = require("express");
const router = express.Router();

const { findAll, findOne, update } = require("../controllers/user.controller");

router.get("/", findAll);

router.get("/:id", findOne);

router.patch("/:id", update);

module.exports = router;
