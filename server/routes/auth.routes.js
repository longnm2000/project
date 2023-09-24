const express = require("express");
const router = express.Router();
//
const {
  signUp,
  signIn,
  signInAdmin,
  signupAdmin,
} = require("../controllers/auth.controller");

router.post("/sign-up", signUp);

router.post("/sign-in", signIn);

router.post("/admin/sign-in", signInAdmin);
// router.post("/admin/sign-up", signupAdmin);

module.exports = router;
