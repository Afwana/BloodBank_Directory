const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddlleware = require("../middlewares/authMiddlleware");
const router = express.Router();

// routes
// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// GET CURRENT USER || GET
router.get("/current-user", authMiddlleware, currentUserController);

module.exports = router;
