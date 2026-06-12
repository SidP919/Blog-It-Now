const mongoose = require("mongoose");
const Blog = require("../models/blogSchema");
const Comment = require("../models/commentSchema");
const Reply = require("../models/replySchema");
const User = require("../models/userSchema");
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
    const sortBy = (req.query.sortBy || "mostLiked").toLowerCase();
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 5), 50);
    const skip = (page - 1) * limit;

    // Check if required info was sent in request or not
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message:
          "Required information/fields is/are missing! Please provide it & try again.",
      });
    }

    const sortStage =
      sortBy === "mostrecent"
        ? { $sort: { createdAt: -1 } }
        : { $sort: { likesCount: -1, createdAt: -1 } };

    const [result] = await Comment.aggregate([
      { $match: { blog: new mongoose.Types.ObjectId(blogId) } },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      sortStage,
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: limit }],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "data.commenter",
          foreignField: "_id",
          as: "commenterData",
        },
      },
    ]);

    const comments = result.data;
    const totalComments = result.metadata[0]?.total || 0;

    // Populate commenter info manually
    const commentsWithCommenter = comments.map((comment) => {
      const commenterInfo = result.commenterData.find(
        (user) => user._id.toString() === comment.commenter.toString()
      );
      return {
        ...comment,
        commenter: commenterInfo
          ? { id: commenterInfo._id, fullname: commenterInfo.fullname }
          : null,
      };
    });

    const transformedComments = commentsWithCommenter.map((comment) => ({
      id: comment._id,
      _id: comment._id,
      content: comment.content,
      commenter: comment.commenter,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      noOfLikes: comment.likes?.length || 0,
      noOfDislikes: comment.dislikes?.length || 0,
      noOfReplies: comment.replies?.length || 0,
    }));

    res.status(200).json({
      success: true,
      message: "Comments for the blog have been fetched successfully.",
      comments: transformedComments,
      pagination: {
        page,
        limit,
        totalComments,
        totalPages: Math.ceil(totalComments / limit),
        hasMore: page * limit < totalComments,
      },
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
 * @CREATE_REPLY
 * @route http://localhost:4000/api/v1/blogs/createReply/:commentId
 * @requestType POST
 * @description CreateReply Controller for creating a reply
 * @parameters commentId, content
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const createReply = async (req, res) => {
  try {
    const { content } = req.body;
    const commentId = req.params.commentId;
    const replier = req.user;

    if (!(content && commentId)) {
      return res.status(400).json({
        success: false,
        message:
          "Mandatory fields cannot be empty! Please provide them & try again.",
      });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment Not Found!" });
    }

    const blog = await Blog.findById(comment.blog);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Parent blog not found for this comment!",
      });
    }

    if (!blog.published) {
      return res.status(400).json({
        success: false,
        message: "Reply on an unpublished blog is not allowed!",
      });
    }

    const newReply = await Reply.create({
      content,
      replierId: replier,
      commentId,
    });

    comment.replies.push(newReply._id);
    await comment.save();

    await newReply.populate("replierId", "fullname");

    res.status(201).json({
      success: true,
      message: "Reply has been added to the comment successfully.",
      reply: {
        id: newReply._id,
        content: newReply.content,
        replier: {
          id: newReply.replierId._id,
          fullname: newReply.replierId.fullname,
        },
        createdAt: newReply.createdAt,
        updatedAt: newReply.updatedAt,
        noOfLikes: 0,
        noOfDislikes: 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while creating the reply!",
    });
  }
};

/****************************************************************************************
 * @GET_REPLIES_FOR_COMMENT
 * @route http://localhost:4000/api/v1/blogs/getReplies/:commentId
 * @requestType GET
 * @description getRepliesForComment Controller for getting replies for a comment
 * @parameters commentId
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const getRepliesForComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 5), 50);
    const skip = (page - 1) * limit;

    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "Required information/fields is/are missing! Please provide it & try again.",
      });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment Not Found!" });
    }

    const [replies, totalReplies] = await Promise.all([
      Reply.find({ commentId })
        .populate("replierId", "fullname")
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit),
      Reply.countDocuments({ commentId }),
    ]);

    const transformedReplies = replies.map((reply) => ({
      id: reply._id,
      _id: reply._id,
      content: reply.content,
      replier: reply.replierId
        ? { id: reply.replierId._id, fullname: reply.replierId.fullname }
        : null,
      createdAt: reply.createdAt,
      updatedAt: reply.updatedAt,
      noOfLikes: reply.likes?.length || 0,
      noOfDislikes: reply.dislikes?.length || 0,
    }));

    res.status(200).json({
      success: true,
      message: "Replies have been fetched successfully.",
      replies: transformedReplies,
      pagination: {
        page,
        limit,
        totalReplies,
        totalPages: Math.ceil(totalReplies / limit),
        hasMore: page * limit < totalReplies,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while fetching replies for the comment!",
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
  createReply,
  getRepliesForComment,
  deleteComment,
};
