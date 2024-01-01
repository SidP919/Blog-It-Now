const Blog = require("../models/blogSchema");
const Comment = require("../models/commentSchema");

/****************************************************************************************
 * @CREATE_COMMENT
 * @route http://localhost:4000/api/v1/blogs/createComment/:blogId
 * @requestType POST
 * @description CreateComment Controller for creating a comment
 * @parameters blogId, content
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;
    const commenter = req.user;

    // Check if required info was sent in request or not
    if (!(content && blogId)) {
      return res.status(400).json({
        success: false,
        message:
          "Mandatory fields cannot be empty! Please provide them & try again.",
      });
    }

    // Update blog's comments array
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "We cannot add comment on a blog which doesn't exist!",
      });
    }

    if (!blog.published) {
      return res.status(400).json({
        success: false,
        message: "Comment on an unpublished blog is not allowed!",
      });
    }

    // Create the comment
    const newComment = await Comment.create({
      content,
      commenter,
      blog: blogId,
    });

    blog.comments.push(newComment._id);
    await blog.save();

    res.status(201).json({
      success: true,
      message: "Comment has been created & added to the Blog successfully.",
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while creating the comment!",
    });
  }
};

/****************************************************************************************
 * @EDIT_COMMENT
 * @route http://localhost:4000/api/v1/blogs/editComment/:commentId
 * @requestType PUT
 * @description EditBlog Controller for editing a blog
 * @parameters blogId, title, content, blogThumbnail, blogVideo, category
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const editComment = async (req, res) => {
  try {
    const { content } = req.body;
    const commentId = req.params.commentId;
    const commenter = req.user;

    // Check if required info was sent in request or not
    if (!(content && commentId)) {
      return res.status(400).json({
        success: false,
        message:
          "Mandatory fields cannot be empty! Please provide them & try again.",
      });
    }

    // Check if the user is the commenter of the comment
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment Not Found!" });
    }

    if (comment.commenter.toString() !== commenter._id.toString()) {
      return res.status(403).json({
        success: false,
        message:
          "Unauthorized! You are not the commenter of this comment, and hence, you cannot edit it.",
      });
    }

    // Update the comment
    comment.content = content;

    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment has been updated successfully.",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while editing the comment!",
    });
  }
};

/****************************************************************************************
 * @GET_COMMENTS_FOR_BLOG
 * @route http://localhost:4000/api/v1/blogs/getComments/:blogId
 * @requestType GET
 * @description GetComments Controller for getting comments on a blog
 * @parameters blogId
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const getCommentsForBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    // Check if required info was sent in request or not
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message:
          "Required information/fields is/are missing! Please provide it & try again.",
      });
    }

    const comments = await Comment.find({ blog: blogId });

    if (!comments) {
      return res.status(404).json({
        success: false,
        message: "No comments were found for this blog!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comments for the blog have been fetched successfully.",
      comments,
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while fetching the comments for the blog!",
    });
  }
};

/****************************************************************************************
 * @DELETE_COMMENT
 * @route http://localhost:4000/api/v1/blogs/deleteComment/:commentId
 * @requestType DELETE
 * @description deleteComment Controller for deleting a comment
 * @parameters commentId
 * @returns JSON object( containing response message)
 **************************************************************************************/
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const commenter = req.user;

    // Check if required info was sent in request or not
    if (!commentId && commenter) {
      return res.status(400).json({
        success: false,
        message:
          "Required information/fields is/are missing! Please provide it & try again.",
      });
    }

    // Check if the user is the author of the blog
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment Not Found!",
      });
    }

    if (comment.commenter.toString() !== commenter._id.toString()) {
      return res.status(403).json({
        error:
          "Unauthorized! You are not the author of this comment, and hence, you cannot delete it.",
      });
    }

    // Remove the blog
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment has been deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while deleting the comment!",
    });
  }
};

module.exports = {
  createComment,
  editComment,
  getCommentsForBlog,
  deleteComment,
};
