const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

//Get user/userinfo
router.get("/userinfo", userController.getuserinfo)

//Post user/login
router.post("/login", userController.login);

//Post user/logout
router.post("/logout", userController.logout);

//Post user/CheckPassWord
router.post("/checkPassword", userController.CheckPassWord)

//Post user/signUp
router.post("/signup", userController.signUpController);

//Post user/checkUsername
router.post("/checkUsername", userController.filterusername);

//Post user/checkEmail
router.post("/checkEmail", userController.filteremail);

//POST user/updateUserinfo
router.post("/updateUserinfo", userController.updateUserinfo);

module.exports = router;