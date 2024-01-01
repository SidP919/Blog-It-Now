const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const { logger } = require("../utils/logger");
const markdown = require("markdown-it")();

/****************************************************************************************
 * @CREATE_BLOG
 * @route http://localhost:4000/api/v1/blogs/createBlog
 * @requestType POST
 * @description CreateBlog Controller for creating a blog
 * @parameters title, content, blogThumbnail, blogVideo, category
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const createBlog = async (req, res) => {
  try {
    const { title, content, blogThumbnail, blogVideo, category, tags } =
      req.body;
    const author = req.user;

    // Check if required info was sent in request or not
    if (!(title && content && category)) {
      return res.status(400).json({
        success: false,
        message:
          "Mandatory fields cannot be empty! Please fill them & try again.",
      });
    }

    let transformedTags =
      tags && tags?.length > 0
        ? [...new Set(tags.map((t) => t?.toLowerCase().trim()))]
        : [category.toLowerCase()];
    transformedTags = transformedTags.includes(category.toLowerCase())
      ? transformedTags
      : [category.toLowerCase(), ...transformedTags];

    // Create the blog
    const newBlog = await Blog.create({
      title,
      content: content || "",
      author,
      blogThumbnail: blogThumbnail || null,
      blogVideo: blogVideo || null,
      category,
      tags: transformedTags,
    });

    // Update user's blogs array
    author.blogs.push(newBlog._id);
    await author.save();

    res.status(201).json({
      success: true,
      message: "Blog has been created successfully.",
      blog: newBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while creating the blog!",
    });
  }
};

/****************************************************************************************
 * @GET_BLOG_For_EDIT
 * @route http://localhost:4000/api/v1/blogs/getBlogForEdit/:blogId
 * @requestType GET
 * @description GetBlogForEdit Controller for getting data of a blog for editing
 * @parameters blogId
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const getBlogForEdit = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const author = req.user;

    // Check if required info was sent in request or not
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message:
          "Required information/fields is/are missing! Please provide it & try again.",
      });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found!",
      });
    }

    if (blog.author.toString() !== author._id.toString()) {
      return res.status(403).json({
        error:
          "Unauthorized! You are not the author of this blog, and hence, you cannot access it.",
      });
    }

    const blogData = {
      ...blog._doc,
      content: blog.content,
      likes: undefined,
      dislikes: undefined,
      comments: undefined,
    };

    res.status(200).json({
      success: true,
      message: "Blog data has been fetched successfully.",
      blogData,
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while fetching data of a blog!",
    });
  }
};

/****************************************************************************************
 * @EDIT_BLOG
 * @route http://localhost:4000/api/v1/blogs/editBlog/:blogId
 * @requestType PUT
 * @description EditBlog Controller for editing a blog
 * @parameters blogId, title, content, blogThumbnail, blogVideo, category
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const editBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      blogThumbnail,
      blogVideo,
      published,
      tags,
    } = req.body;
    const blogId = req.params.blogId;
    const author = req.user;

    // Check if required info was sent in request or not
    if (!(blogId && title && content && category)) {
      return res.status(400).json({
        success: false,
        message:
          "Required information/fields is/are missing! Please provide it & try again.",
      });
    }

    // Check if the user is the author of the blog
    const blog = await Blog.findById({ _id: blogId });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found!",
      });
    }

    if (blog.author.toString() !== author._id.toString()) {
      return res.status(403).json({
        error:
          "Unauthorized! You are not the author of this blog, and hence, you cannot access it.",
      });
    }

    let tagsLowerCase =
      tags && tags?.length > 0
        ? [...new Set(tags.map((t) => t?.toLowerCase().trim()))]
        : [category.toLowerCase()];
    tagsLowerCase = tagsLowerCase.includes(category.toLowerCase())
      ? tagsLowerCase
      : [category.toLowerCase(), ...tagsLowerCase];

    // Update the blog
    blog.title = title;
    blog.content = content;
    blog.blogThumbnail = blogThumbnail || null;
    blog.blogVideo = blogVideo || null;
    blog.category = category;
    blog.published = published === undefined ? blog.published : published;
    blog.tags = tagsLowerCase;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog has been updated successfully.",
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while editing the blog!",
    });
  }
};

/****************************************************************************************
 * @PUBLISH_BLOG
 * @route http://localhost:4000/api/v1/blogs/publishBlog/:blogId
 * @requestType PUT
 * @description PublishBlog Controller for publishing/hiding a blog
 * @parameters blogId
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const publishBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const authorId = req.user.userId;

    // Check if required info was sent in request or not
    if (!(blogId && authorId)) {
      return res.status(400).json({
        success: false,
        message:
          "Required information/fields is/are missing! Please provide it & try again.",
      });
    }

    // Check if the user is the author of the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog Not Found!" });
    }
    if (blog.author.toString() !== authorId.toString()) {
      return res.status(403).json({
        success: false,
        message:
          "Unauthorized! You are not the author of this blog, and hence, you cannot access it.",
      });
    }

    // Update the published field to true
    if (blog.published) {
      blog.published = false;
    } else {
      blog.published = true;
    }
    await blog.save();

    res.status(200).json({
      success: true,
      message: `Blog has been ${
        blog.published ? "published" : "made private"
      } successfully.`,
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while publishing/hiding the blog!",
    });
  }
};

/****************************************************************************************
 * @DELETE_BLOG
 * @route http://localhost:4000/api/v1/blogs/deleteBlog/:blogId
 * @requestType DELETE
 * @description deleteBlog Controller for deleting a blog
 * @parameters blogId
 * @returns JSON object( containing response message)
 **************************************************************************************/
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const author = req.user;

    // Check if required info was sent in request or not
    if (!blogId && author) {
      return res.status(400).json({
        success: false,
        message:
          "Required information/fields is/are missing! Please provide it & try again.",
      });
    }

    // Check if the user is the author of the blog
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found!",
      });
    }

    if (blog.author.toString() !== author._id.toString()) {
      return res.status(403).json({
        error:
          "Unauthorized! You are not the author of this blog, and hence, you cannot delete it.",
      });
    }

    // Remove the blog
    await Blog.findByIdAndDelete(blogId);

    // Remove blogId from user's blogs array
    const user = await User.findById({ _id: author._id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "Blog has been deleted successfully! However, Author of this blog was not found!",
      });
    }

    user.blogs = user.blogs.filter((id) => id.toString() !== blogId);
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Blog has been deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while deleting the blog!",
    });
  }
};

/****************************************************************************************
 * @GET_BLOG_BY_ID
 * @route http://localhost:4000/api/v1/blogs/getBlog/:blogId
 * @requestType GET
 * @description GetBlog Controller for getting data of a blog
 * @parameters blogId
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const getBlogById = async (req, res) => {
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

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found!",
      });
    }

    const blogData = {
      ...blog._doc,
      content: markdown.render(blog.content),
      noOfLikes: blog.likes?.length,
      noOfDislikes: blog.dislikes?.length,
      likes: undefined,
      dislikes: undefined,
    };

    res.status(200).json({
      success: true,
      message: "Blog data has been fetched successfully.",
      blogData,
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while fetching data of a blog!",
    });
  }
};

/****************************************************************************************
 * @LIKE_DISLIKE
 * @route http://localhost:4000/api/v1/blogs/likeDislike
 * @requestType POST
 * @description LikeDislike Controller for liking/disliking a blog/comment
 * @parameters targetId, targetType, action
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const likeDislike = async (req, res) => {
  try {
    const { targetId, targetType, action } = req.body;
    const user = req.user;

    let target;
    let actionStr = "";

    // Check if required info was sent in request or not
    if (!(targetId && targetType && action)) {
      return res.status(400).json({
        success: false,
        message:
          "Required information/fields is/are missing! Please provide it & try again.",
      });
    }

    if (targetType?.toLowerCase() === "blog") {
      target = await Blog.findById(targetId);
    } else if (targetType?.toLowerCase() === "comment") {
      target = await Comment.findById(targetId);
    } else {
      return res.status(400).json({
        success: false,
        message:
          'You are trying to like/dislike an unknown entity! Use "blog" or "comment".',
      });
    }

    if (!target) {
      return res
        .status(404)
        .json({ success: false, message: `${target} not found!` });
    }

    // Perform like/dislike action based on the specified action
    if (action?.toLowerCase() === "like") {
      if (!target.likes.includes(user._id)) {
        // if haven't liked yet
        target.likes.push(user._id);
        // Remove user from dislikes if present
        target.dislikes = target.dislikes.filter(
          (userId) => userId.toString() !== user._id.toString()
        );
        actionStr = action + "d";
      } else {
        // if already liked and want to remove the like
        target.likes = target.likes.filter(
          (userId) => userId.toString() !== user._id.toString()
        );
        actionStr = "removed the " + action + " on";
      }
    } else if (action?.toLowerCase() === "dislike") {
      if (!target.dislikes.includes(user._id)) {
        // if haven't disliked yet
        target.dislikes.push(user._id);
        // Remove user from likes if present
        target.likes = target.likes.filter(
          (userId) => userId.toString() !== user._id.toString()
        );
        actionStr = action + "d";
      } else {
        // if already disliked and want to remove the dislike
        target.dislikes = target.dislikes.filter(
          (userId) => userId.toString() !== user._id.toString()
        );
        actionStr = "removed the " + action + " on";
      }
    } else {
      return res.status(400).json({
        success: false,
        message:
          'Not sure what you are trying to do here. You can either "like" or "dislike".',
      });
    }

    await target.save();

    res.status(200).json({
      success: false,
      message: `${actionStr} the ${targetType} successfully.`,
      [`${action}Count`]: target[`${action}s`].length,
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while liking/disliking blog/comment!",
    });
  }
};

module.exports = {
  createBlog,
  getBlogForEdit,
  editBlog,
  publishBlog,
  deleteBlog,
  getBlogById,
  likeDislike,
};
