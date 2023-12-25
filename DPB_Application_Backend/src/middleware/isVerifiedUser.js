const ENV_CONSTANTS = require("../constants/config.contants");
const User = require("../models/userSchema");
const { logger } = require("../utils/logger");

const isVerifiedUser = async (req, res, next) => {
  try {
    req.user = await User.findOne({ _id: req.user.userId });
    if (req.user.verifiedUser) {
      return next();
    } else {
      return res.status(401).json({
        success: false,
        message: `This user account hasn't been verified yet. If you have registered within the last ${ENV_CONSTANTS.EMAIL_VERIFICATION_EXPIRY} days, then please check your registered email box and find an email with subject: "${ENV_CONSTANTS.APP_NAME} - Welcome ${req.user.fullname}" for more details.`,
      });
    }
  } catch (error) {
    logger(err);
    // if invalid auth_token:
    return res.status(403).json({
      success: false,
      message:
        "Oops! something went wrong on the server side while verifying the user.",
    });
  }
};

module.exports = isVerifiedUser;
