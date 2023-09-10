const express = require("express");
const router = express.Router();
const chat = require("./chat/router");
const users = require("./users/router");
router.use("/chat", chat);
router.use("/users", users);

module.exports = router;
