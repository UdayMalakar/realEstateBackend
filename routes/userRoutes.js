const express = require("express");
const router = express.Router();
const {sendOTP,signup,login,logout, changePassword}=require("../controllers/Auth");
const {auth}= require("../middlewears/auth");
router.post("/sendotp",sendOTP);
router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout);
router.post("/changePassword",auth,changePassword);
module.exports =router;
