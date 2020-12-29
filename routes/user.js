const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

//Get user/userinfo
router.get("/userinfo", userController.getuserinfo)

module.exports = router;