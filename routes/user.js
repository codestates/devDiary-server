const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

//Post user/CheckPassWord
router.post("/checkPassword", userController.CheckPassWord)

module.exports = router;