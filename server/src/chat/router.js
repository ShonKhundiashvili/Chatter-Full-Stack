const express = require("express");
const router = express.Router();
const service = require("./service");
router.post("/request", service.requestChat);

module.exports = router;
