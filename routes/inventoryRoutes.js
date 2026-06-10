const express = require("express");
const authMiddlleware = require("../middlewares/authMiddlleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getDonorOrganisationsController,
  getDonorDonationsController,
  getAnalyticsController,
  getHospitalOrganisationsController,
  getHospitalConsumersController,
} = require("../controllers/inventoryController");

const router = express.Router();

router.post(
  "/create-inventory",
  authMiddlleware,
  roleMiddleware("organisation"),
  createInventoryController
);

router.get(
  "/get-inventory",
  authMiddlleware,
  roleMiddleware("organisation"),
  getInventoryController
);

router.get(
  "/get-donars",
  authMiddlleware,
  roleMiddleware("organisation"),
  getDonarsController
);

router.get(
  "/get-hospitals",
  authMiddlleware,
  roleMiddleware("organisation"),
  getHospitalsController
);

router.get(
  "/analytics",
  authMiddlleware,
  roleMiddleware("organisation"),
  getAnalyticsController
);

router.get(
  "/donor-organisations",
  authMiddlleware,
  roleMiddleware("donar"),
  getDonorOrganisationsController
);

router.get(
  "/donor-donations",
  authMiddlleware,
  roleMiddleware("donar"),
  getDonorDonationsController
);

router.get(
  "/hospital-organisations",
  authMiddlleware,
  roleMiddleware("hospital"),
  getHospitalOrganisationsController
);

router.get(
  "/hospital-consumers",
  authMiddlleware,
  roleMiddleware("hospital"),
  getHospitalConsumersController
);

module.exports = router;
