const express = require("express");
const router = express.Router();
const service = require("./service");
router.get("/request", service.requestChat);
router.post("/sendMessage", service.sendMessage);
router.post("/deleteMessage", service.deleteMessage);

module.exports = router;
