const AUTH_ROLES = require("../models/utils/authRoles");
const { logger } = require("../utils/logger");

const isAdmin = (req, res, next) => {
    try {
        const userRole = req.user?.role;
    if(userRole === AUTH_ROLES.ADMIN) {
        return next();
    }else{
        return res.status(403).json({
            success: false,
            message: "User doesn't have Level 4 access.",
          });
    }
    } catch (error) {
        logger('isAdmin Error:', error);
    // if invalid auth_token:
    return res.status(403).json({
      success: false,
      message: "Oops! something went wrong on the server side while verifying the Level 4 access.",
    });
    }
}

module.exports = isAdmin;