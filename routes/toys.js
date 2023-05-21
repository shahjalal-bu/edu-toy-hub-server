const express = require("express");
const router = express.Router();
const toysController = require("../controllers/toys.controller");

router.get("/cat/:categoryName", toysController.findAllByCategory);
router.get("/", toysController.findAll);
router.get("/categorynames", toysController.findCategory);
router.get("/:id", toysController.findById);
router.post("/", toysController.insertOne);
router.put("/:id", toysController.findAndUpdate);
router.patch("/deals-of-the-day/:id", toysController.dealsOfDayUpdate);
router.delete("/:id", toysController.findByIdAndDelete);

module.exports = router;
