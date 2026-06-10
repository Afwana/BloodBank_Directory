const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");

const getUsersByRoleController = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await userModel
      .find({ role })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: `${role} users fetched successfully`,
      users,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching users",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    if (user.role === "admin") {
      return res.status(400).send({
        success: false,
        message: "Cannot delete admin account",
      });
    }
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error deleting user",
      error,
    });
  }
};

const getAdminStatsController = async (req, res) => {
  try {
    const [donars, hospitals, organisations, inventoryCount] =
      await Promise.all([
        userModel.countDocuments({ role: "donar" }),
        userModel.countDocuments({ role: "hospital" }),
        userModel.countDocuments({ role: "organisation" }),
        inventoryModel.countDocuments(),
      ]);

    return res.status(200).send({
      success: true,
      stats: { donars, hospitals, organisations, inventoryCount },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching stats",
      error,
    });
  }
};

module.exports = {
  getUsersByRoleController,
  deleteUserController,
  getAdminStatsController,
};
