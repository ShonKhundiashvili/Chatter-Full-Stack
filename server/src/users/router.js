const express = require("express");
const router = express.Router();
const service = require("./service");
const { verifyToken } = require("./auth");

router.post("/register", service.register);
router.post("/login", service.login);

//Protected routes
router.use(verifyToken);
router.post("/changePassword", service.changePassword);

module.exports = router;
