const express = require("express");
const authMiddlleware = require("../middlewares/authMiddlleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  getUsersByRoleController,
  deleteUserController,
  getAdminStatsController,
} = require("../controllers/adminController");

const router = express.Router();

router.get(
  "/stats",
  authMiddlleware,
  roleMiddleware("admin"),
  getAdminStatsController
);

router.get(
  "/users/:role",
  authMiddlleware,
  roleMiddleware("admin"),
  getUsersByRoleController
);

router.delete(
  "/user/:id",
  authMiddlleware,
  roleMiddleware("admin"),
  deleteUserController
);

module.exports = router;
