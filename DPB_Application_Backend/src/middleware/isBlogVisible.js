const Blog = require("../models/blogSchema");
const AUTH_CONSTANTS = require("../constants/auth.constants");
const JWT = require("jsonwebtoken");
const isBlogVisible = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog Not Found!" });
    } else if (blog.published) {
      return next();
    } else {
      const token =
        req.header("Authorization")?.replace("Bearer", "")?.trim() ||
        req.cookies?.token;
      if (!token) {
        return res.status(403).json({
          success: false,
          message:
            "Unauthorized! Only the author of this blog can access it. If you are the author then please login and try again.",
        });
      }
      // Verify if token is valid or not
      const decoded = await JWT.verify(token, AUTH_CONSTANTS.JWT_AUTH_SECRET);
      // If User is authenticated, assign decoded object's data to req.user object
      req.user = decoded;
      if (req.user?.userId) {
        if (blog.author._id.toString() === req.user.userId.toString()) {
          return next();
        } else {
          return res.status(403).json({
            success: false,
            message:
              "Unauthorized! Only the author of this blog can access it.",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Auth Token doesn't contain valid user's Id!",
        });
      }
    }
  } catch (error) {
    // if invalid auth_token:
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        success: false,
        message: "Provided Auth Token is Invalid! Please login and try again.",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        message:
          "Provided Auth Token has been expired! Please login and try again.",
      });
    }
    console.error(error);
    return res.status(405).json({
      success: false,
      message:
        "Oops! something went wrong on the server side while fetching the blog data.",
    });
  }
};

module.exports = isBlogVisible;
