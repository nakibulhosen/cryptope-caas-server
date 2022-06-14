// external imports
const express = require("express");
const { userLogin, userRegistraiton } = require("../controller/userController");
const tokenValidator = require("../middlewares/common/tokenValidator");
const { addUserValidationHandler, addUserValidator } = require("../middlewares/user/userValidator");

const router = express.Router();
router.post("/login", userLogin); // login
router.post("/registration", addUserValidator, addUserValidationHandler, userRegistraiton); //register 
router.get("/userList", tokenValidator, getUserList); //get user list

module.exports = router;