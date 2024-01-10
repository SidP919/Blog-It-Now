const AUTH_CONSTANTS = require("../constants/auth.constants");
const JWT = require("jsonwebtoken");
const { logger } = require("../utils/logger");

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer", "")?.trim() ||
      req.cookies?.token;
    // proceed further only if token exists
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Auth Token is Missing! Please login and try again.",
      });
    }

    // Verify if token is valid or not
    const decoded = await JWT.verify(token, AUTH_CONSTANTS.JWT_AUTH_SECRET);
    // If User is authenticated, assign decoded object's data to req.user object
    req.user = decoded;
    if (req.user?.userId) {
      return next();
    } else {
      return res.status(400).json({
        success: false,
        message: "Auth Token doesn't contain valid user's Id!",
      });
    }
  } catch (err) {
    // if invalid auth_token:
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({
        success: false,
        message: "Provided Auth Token is Invalid! Please login and try again.",
      });
    } else if (err.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        message: "Provided Auth Token has been expired! Please login and try again.",
      });
    }
    console.error(err);
    return res.status(405).json({
      success: false,
      message:
        "Oops! something went wrong on the server side while authenticating the request.",
    });
  }
};

module.exports = authenticate; // The authenticate function is exported to authenticate requests if the token is set in header. It is basically a middleware function which can be used to ensure that only already logged-in users can access a specific route.
