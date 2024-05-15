const express = require("express");
const router = express.Router();
const {sendOTP,signup,login,logout}=require("../controllers/Auth");

router.post("/sendotp",sendOTP);
router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout)
module.exports =router;
