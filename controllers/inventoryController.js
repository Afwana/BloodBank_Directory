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

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
};
