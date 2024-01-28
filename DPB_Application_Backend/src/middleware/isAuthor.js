const { APP_EMAIL } = require("../constants/config.contants");
const AUTH_ROLES = require("../models/utils/authRoles");
const { logger } = require("../utils/logger");

const isAuthor = (req, res, next) => {
  try {
    const userRole = req.user?.role;
    if (userRole === AUTH_ROLES.ADMIN || userRole === AUTH_ROLES.AUTHOR) {
      return next();
    } else {
      return res
        .status(423)
        .json({
          success: false,
          message: `Unauthorized! Only users who are Authors can create blogs. Reach us at ${APP_EMAIL} to become an author.`,
        });
    }
  } catch (error) {
    logger("isAuthor Error:", error);
    // if invalid auth_token:
    return res.status(403).json({
      success: false,
      message:
        "Oops! something went wrong on the server side while verifying the Level 2 access.",
    });
  }
};

module.exports = isAuthor;
