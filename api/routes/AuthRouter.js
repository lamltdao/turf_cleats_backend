const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.get("/account", AuthController.getAccountInfoByToken);
router.post("/login", AuthController.login);

module.exports = router;
