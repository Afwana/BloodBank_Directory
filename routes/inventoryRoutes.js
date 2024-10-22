const express = require("express");
const authMiddlleware = require("../middlewares/authMiddlleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
} = require("../controllers/inventoryController");

const router = express.Router();

// Routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddlleware, createInventoryController);

// GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddlleware, getInventoryController);

// GET DONARS
router.get("/get-donars", authMiddlleware, getDonarsController);

// GET HOSPITALS
router.get("/get-hospitals", authMiddlleware, getHospitalsController);

module.exports = router;
