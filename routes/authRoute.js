const express = require("express");
const authController = require('../controllers/authController')
const router = express.Router();

router.post("/signup", authController.signupProcess);

router.post("/login", authController.loginProcess);

module.exports = router;
