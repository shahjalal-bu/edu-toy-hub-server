const express = require("express");
const router = express.Router();
const toysController = require("../controllers/toys.controller");

router.get("/cat/:categoryName", toysController.findAll);
router.get("/categorynames", toysController.findCategory);
router.get("/:id", toysController.findById);
router.post("/", toysController.insertOne);
router.put("/:id", toysController.findAndUpdate);

module.exports = router;
