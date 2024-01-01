const { Schema, model } = require("mongoose");
const {
  COMMENT_MAX_LENGTH,
  COMMENT_MIN_LENGTH,
} = require("./utils/blogSchemaConsts");

const commentSchema = Schema(
  {
    content: {
      type: String,
      required: [true, "Comment Content cannot be empty!"],
      maxLength: [
        COMMENT_MAX_LENGTH,
        `Comment Content cannot have more than ${COMMENT_MAX_LENGTH} characters!`,
      ],
      minLength: [
        COMMENT_MIN_LENGTH,
        `Comment Content cannot have less than ${COMMENT_MIN_LENGTH} characters!`,
      ],
      trim: true,
    },
    commenter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
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
    replies: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Reply",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
