const express = require("express");
const router = express.Router();
const chat = require("./chat/router");
router.use("/chat", chat);

module.exports = router;
