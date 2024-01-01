const { Schema, model } = require("mongoose");
const {
  CONTENT_MAX_LENGTH,
  CONTENT_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
  THUMBNAIL_MAX_LENGTH,
  BLOG_CATEGORIES,
} = require("./utils/blogSchemaConsts");

const blogSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Blog Title cannot be empty!"],
      maxLength: [
        TITLE_MAX_LENGTH,
        `Blog Title cannot have more than ${TITLE_MAX_LENGTH} characters!`,
      ],
      minLength: [
        TITLE_MIN_LENGTH,
        `Blog Title cannot have less than ${TITLE_MIN_LENGTH} characters!`,
      ],
      trim: true,
      index: "text",
    },
    content: {
      type: String,
      required: [true, "Blog Content cannot be empty!"],
      maxLength: [
        CONTENT_MAX_LENGTH,
        `Blog Content cannot have more than ${CONTENT_MAX_LENGTH} characters!`,
      ],
      minLength: [
        CONTENT_MIN_LENGTH,
        `Blog Content cannot have less than ${CONTENT_MIN_LENGTH} characters!`,
      ],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: BLOG_CATEGORIES,
      lowercase: true,
      required: [true, "Blog Category cannot be empty!"],
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    dislikes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
    blogThumbnail: {
      type: String,
      validate: {
        validator: function (v) {
          // Use a regular expression to check if the thumbnail link is valid
          return /^(https:\/\/).*\..*$/.test(v) || v === null;
        },
        message:
          "Invalid Thumbnail Link! Please check the link and make sure its a secure & valid link.",
      },
      maxLength: [
        THUMBNAIL_MAX_LENGTH,
        `Blog\'s Thumbnail-image link cannot contain more than ${THUMBNAIL_MAX_LENGTH} characters!`,
      ],
      trim: true,
    },
    blogVideo: {
      type: String,
      validate: {
        validator: function (v) {
          // Validate if the provided value is a valid YouTube embedded iframe HTML code
          return (
            /^<iframe.*src="https:\/\/www\.youtube\.com\/embed\/.*".*<\/iframe>$/.test(
              v
            ) || v === null
          );
        },
        message:
          "Invalid Youtube Video embed code! Please check the provided embed code and make sure its a valid link.",
      },
      maxLength: [
        THUMBNAIL_MAX_LENGTH,
        `Blog\'s Youtube video embed code cannot contain more than ${THUMBNAIL_MAX_LENGTH} characters!`,
      ],
    },
    published: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [
        {
          type: String,
          index: "text",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = model("blog", blogSchema);

module.exports = Blog;
