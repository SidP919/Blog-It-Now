const express = require("express");
const isAuthor = require("../middleware/isAuthor");
const authenticate = require("../middleware/authenticate");
const isVerifiedUser = require("../middleware/isVerifiedUser");
const {
  createBlog,
  editBlog,
  deleteBlog,
  likeDislike,
  getBlogById,
  publishBlog,
  getBlogForEdit,
} = require("../controllers/blogControllers");
const {
  createComment,
  editComment,
  getCommentsForBlog,
  deleteComment,
} = require("../controllers/commentControllers");
const {
  getSortedBlogs,
  searchBlogs,
  getTopBlogs,
  getBlogsByAuthor,
} = require("../controllers/filterBlogsControllers");
const isBlogVisible = require("../middleware/isBlogVisible");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Blog-specific Routes
router.post("/createBlog", authenticate, isVerifiedUser, isAuthor, createBlog);
router.get(
  "/getBlogForEdit/:blogId",
  authenticate,
  isVerifiedUser,
  isAuthor,
  getBlogForEdit
);
router.put(
  "/editBlog/:blogId",
  authenticate,
  isVerifiedUser,
  isAuthor,
  editBlog
);
router.get("/getBlog/:blogId", isBlogVisible, getBlogById);
router.put("/publishBlog/:blogId", authenticate, isVerifiedUser, publishBlog);
router.delete(
  "/deleteBlog/:blogId",
  authenticate,
  isVerifiedUser,
  isAuthor,
  deleteBlog
);

// comment-specific routes
router.post(
  "/createComment/:blogId",
  authenticate,
  isVerifiedUser,
  createComment
);
router.put(
  "/editComment/:commentId",
  authenticate,
  isVerifiedUser,
  editComment
);
router.delete(
  "/deleteComment/:commentId",
  authenticate,
  isVerifiedUser,
  deleteComment
);
router.get("/getComments/:blogId", getCommentsForBlog);

// filter blogs routes
router.get("/getBlogs/:sortBy", getSortedBlogs);
router.get("/searchBlogs", searchBlogs);
router.get("/getTopBlogs", getTopBlogs);
router.get(
  "/getTopBlogsWithCount/:blogCount",
  authenticate,
  isVerifiedUser,
  isAdmin,
  getTopBlogs
);
router.get(
  "/getBlogsByAuthor",
  authenticate,
  isVerifiedUser,
  isAuthor,
  getBlogsByAuthor
);

// like/dislike blogs/comments
router.put("/likeDislike", authenticate, isVerifiedUser, likeDislike);

module.exports = router;
