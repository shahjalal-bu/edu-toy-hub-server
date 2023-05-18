const express = require("express");
const router = express.Router();
const toysController = require("../controllers/toys.controller");

router.get("/all", toysController.findAll);

module.exports = router;
