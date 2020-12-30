const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

//Get user/userinfo
// router.get("/userinfo", userController.getuserinfo)

//Post user/deleteUser
// router.post("/deleteUser", userController.deleteUser)

//Post user/CheckPassWord
router.post("CheckPassWord", userController.CheckPassWord)

module.exports = router;