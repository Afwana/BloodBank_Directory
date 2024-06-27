const express = require("express");
const authMiddlleware = require("../middlewares/authMiddlleware");
const {
  createInventoryController,
  getInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

// Routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddlleware, createInventoryController);

// GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddlleware, getInventoryController);

module.exports = router;
