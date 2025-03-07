const express = require("express");
const router = express.Router();
const hangmanController = require("../controllers/hangmanController.js");

router.get("/", hangmanController.getWord);

module.exports = router;