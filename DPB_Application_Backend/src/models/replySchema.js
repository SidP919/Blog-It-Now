const { Schema, model } = require("mongoose");
const {
  COMMENT_MAX_LENGTH,
  COMMENT_MIN_LENGTH,
} = require("./utils/blogSchemaConsts");

const replySchema = Schema(
  {
    content: {
      type: String,
      required: [true, "Reply Content cannot be empty!"],
      maxLength: [
        COMMENT_MAX_LENGTH,
        `Reply Content cannot have more than ${COMMENT_MAX_LENGTH} characters!`,
      ],
      minLength: [
        COMMENT_MIN_LENGTH,
        `Reply Content cannot have less than ${COMMENT_MIN_LENGTH} characters!`,
      ],
      trim: true,
    },
    replierId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
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
  },
  {
    timestamps: true,
  }
);

const Reply = model("Reply", replySchema);

module.exports = Reply;
