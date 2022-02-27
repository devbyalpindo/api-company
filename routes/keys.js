const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateToken");
const keys = require("../controller/keys/index");

router.get("/", validateToken, keys.getKeys);

module.exports = router;
