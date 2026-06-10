const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    // validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital account");
    // }

    req.body.organisation = req.body.userId;

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantity = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      // calculate blood quantity
      const totalInOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInOfRequestedBloodGroup[0]?.total || 0;

      // calculate out blood quanity
      const totalOutOfRequatedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequatedBloodGroup[0]?.total || 0;

      // In & Out Calculation
      const availableQuaniityOfBloodGroup = totalIn - totalOut;

      // Quantity Validation
      if (availableQuaniityOfBloodGroup < requestedQuantity) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuaniityOfBloodGroup} ML of ${requestedBloodGroup.toUpperCase()} is available.`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }
    // save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New blood record added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory API",
      error,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all inventories",
      error,
    });
  }
};

const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    // find donar ids
    const donarId = await inventoryModel.distinct("donar", {
      organisation,
    });
    // find donars
    const donars = await userModel.find({ _id: { $in: donarId } });

    return res.status(200).send({
      success: true,
      message: "Donars data fetched successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in donar records",
      error,
    });
  }
};

const getHospitalsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    // find hospital ids
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    // find hospitals
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });

    return res.status(200).send({
      success: true,
      message: "Hospital data fetched successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in hospital records",
      error,
    });
  }
};

const BLOOD_GROUPS = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];

const getDonorOrganisationsController = async (req, res) => {
  try {
    const donarId = req.body.userId;
    const orgIds = await inventoryModel.distinct("organisation", {
      donar: donarId,
      inventoryType: "in",
    });
    const organisations = await userModel.find({ _id: { $in: orgIds } });
    return res.status(200).send({
      success: true,
      message: "Organisations fetched successfully",
      organisations,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching organisations",
      error,
    });
  }
};

const getDonorDonationsController = async (req, res) => {
  try {
    const donarId = req.body.userId;
    const donations = await inventoryModel
      .find({ donar: donarId, inventoryType: "in" })
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Donations fetched successfully",
      donations,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching donations",
      error,
    });
  }
};

const getAnalyticsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const bloodGroups = await Promise.all(
      BLOOD_GROUPS.map(async (bloodGroup) => {
        const totalInResult = await inventoryModel.aggregate([
          {
            $match: {
              organisation: new mongoose.Types.ObjectId(organisation),
              inventoryType: "in",
              bloodGroup,
            },
          },
          { $group: { _id: null, total: { $sum: "$quantity" } } },
        ]);
        const totalOutResult = await inventoryModel.aggregate([
          {
            $match: {
              organisation: new mongoose.Types.ObjectId(organisation),
              inventoryType: "out",
              bloodGroup,
            },
          },
          { $group: { _id: null, total: { $sum: "$quantity" } } },
        ]);
        const totalIn = totalInResult[0]?.total || 0;
        const totalOut = totalOutResult[0]?.total || 0;
        return {
          bloodGroup,
          totalIn,
          totalOut,
          totalAvailable: totalIn - totalOut,
        };
      })
    );

    const recentTransactions = await inventoryModel
      .find({ organisation })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).send({
      success: true,
      message: "Analytics fetched successfully",
      bloodGroups,
      recentTransactions,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching analytics",
      error,
    });
  }
};

const getHospitalOrganisationsController = async (req, res) => {
  try {
    const hospitalId = req.body.userId;
    const orgIds = await inventoryModel.distinct("organisation", {
      hospital: hospitalId,
      inventoryType: "out",
    });

    const records = await inventoryModel
      .find({
        organisation: { $in: orgIds },
        inventoryType: "in",
      })
      .populate("donar")
      .populate("organisation")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Organisation donation records fetched successfully",
      records,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching organisation records",
      error,
    });
  }
};

const getHospitalConsumersController = async (req, res) => {
  try {
    const hospitalId = req.body.userId;
    const consumptions = await inventoryModel
      .find({ hospital: hospitalId, inventoryType: "out" })
      .populate("organisation")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Consumption records fetched successfully",
      consumptions,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching consumption records",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getDonorOrganisationsController,
  getDonorDonationsController,
  getAnalyticsController,
  getHospitalOrganisationsController,
  getHospitalConsumersController,
};
