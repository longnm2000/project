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

// router.post("/admin/sign-in-admin", signInAdmin);
// router.post("/admin/sign-up-admin", signupAdmin);

module.exports = router;
