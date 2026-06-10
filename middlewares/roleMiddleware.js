const userModel = require("../models/userModel");

const roleMiddleware = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await userModel.findById(req.body.userId);
      if (!user || !roles.includes(user.role)) {
        return res.status(403).send({
          success: false,
          message: "Access denied",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Role verification failed",
        error,
      });
    }
  };
};

module.exports = roleMiddleware;
