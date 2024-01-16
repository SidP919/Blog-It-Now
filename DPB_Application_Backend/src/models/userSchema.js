const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { randomBytes, createHash } = require("crypto");
const USER_SCHEMA_CONSTS = require("./utils/userSchemaConsts.js");
const AUTH_ROLES = require("./utils/authRoles.js");
const AUTH_CONSTANTS = require("../constants/auth.constants.js");
const ENV_CONSTANTS = require("../constants/config.contants.js");

const userSchema = Schema(
  {
    fullname: {
      type: String,
      maxLength: [
        USER_SCHEMA_CONSTS.FULLNAME_MAX_LENGTH,
        `Name cannot be more than ${USER_SCHEMA_CONSTS.FULLNAME_MAX_LENGTH} characters long!`,
      ],
      minLength: [
        USER_SCHEMA_CONSTS.FULLNAME_MIN_LENGTH,
        `Name cannot be less than ${USER_SCHEMA_CONSTS.FULLNAME_MIN_LENGTH} characters long!`,
      ],
      required: [true, "Name cannot be empty!"],
      trim: true,
    },
    username: {
      type: String,
      unique: [true, "User with same username already exists."],
      maxLength: [
        USER_SCHEMA_CONSTS.USERNAME_MAX_LENGTH,
        `Username cannot be more than ${USER_SCHEMA_CONSTS.USERNAME_MAX_LENGTH} characters long!`,
      ],
      minLength: [
        USER_SCHEMA_CONSTS.USERNAME_MIN_LENGTH,
        `Username cannot be less than ${USER_SCHEMA_CONSTS.USERNAME_MIN_LENGTH} characters long!`,
      ],
      match: [
        USER_SCHEMA_CONSTS.USERNAME_MATCH_REGEXP(),
        "Given Username contains invalid characters! Username must contain only alphanumeric characters or an underscore.",
      ],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email address cannot be empty!"],
      unique: [true, "User with same email id already exists."],
      match: [
        USER_SCHEMA_CONSTS.EMAIL_MATCH_REGEXP,
        "Given email address is invalid!",
      ],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty!"],
      minLength: [
        USER_SCHEMA_CONSTS.PASSWORD_MIN_LENGTH,
        `Password cannot be less than ${USER_SCHEMA_CONSTS.PASSWORD_MIN_LENGTH} characters long!`,
      ],
      select: false, //this ensures that "password" won't be sent in DB o/p when user-info is queried from DB.
    },
    favoriteContent: {
      type: String,
      maxLength: [
        USER_SCHEMA_CONSTS.FAV_CONTENT_MAX_LENGTH,
        `Please mention your favorite movie/series/book/manga/anime within ${USER_SCHEMA_CONSTS.FAV_CONTENT_MAX_LENGTH} characters!`,
      ],
      minLength: [
        USER_SCHEMA_CONSTS.FAV_CONTENT_MIN_LENGTH,
        `Your favorite movie/series/manga/book should atleast be ${USER_SCHEMA_CONSTS.FAV_CONTENT_MIN_LENGTH} characters long!`,
      ],
      required: [
        true,
        "Tell us atleast the name of the last movie/series/manga/book you enjoyed.",
      ],
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(AUTH_ROLES),
      default: AUTH_ROLES.USER,
    },
    about:{
      type: String,
      maxLength: [
        USER_SCHEMA_CONSTS.ABOUT_MAX_LENGTH,
        `Please describe about yourself within ${USER_SCHEMA_CONSTS.ABOUT_MAX_LENGTH} characters!`,
      ],
      minLength: [
        USER_SCHEMA_CONSTS.ABOUT_MIN_LENGTH,
        `Please describe about yourself using atleast ${USER_SCHEMA_CONSTS.ABOUT_MIN_LENGTH} characters!`,
      ],
      default: `Hi, I am a reader at ${ENV_CONSTANTS.APP_NAME} platform.`,
      trim: true,
    },
    socialLinks: {
      type: [
        {
          type: String,
          enum: Object.values(USER_SCHEMA_CONSTS.SOCIAL_PLATFORMS),
        }
      ],
      default: [],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verifiedUser: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    verifyTokenExpire: Date,
    blogs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Blog",
        },
      ],
      default: [],
    },
    subscribers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    subscriptions: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

// Whenever we receive user data including password from the client-side,
// then before saving the user data into our DB, we Encrypt the password & THEN save it:
userSchema.pre(
  "save", // "pre" hook will always execute its callback function before "save" function is executed.
  async function (next) {
    // isModified() returns true if password is being modified in current transaction, else returns false.
    if (this.isModified("password")) {
      const salt = await bcryptjs.genSalt(10);
      this.password = await bcryptjs.hash(this.password, salt);
    }
    next();
  }
);

// We can add methods to our userSchema that
// user model object can access like any other mongoose/mongoDB methods:
userSchema.methods = {
  encryptPassword: async function (enteredPwd) {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(enteredPwd, salt);
  },
  comparePassword: async function (enteredPwd) {
    return await bcryptjs.compare(enteredPwd, this.password); // compares entered pwd from client-side and encrypted pwd in DB.
  },

  getJwtToken: function () {
    return JWT.sign(
      // generates a unique JWT Auth Token
      {
        userId: this._id,
        role: this.role,
      },
      AUTH_CONSTANTS.JWT_AUTH_SECRET,
      {
        expiresIn: AUTH_CONSTANTS.JWT_EXPIRY_TIME,
      }
    );
  },

  // generates & assigns a secret token to forgotPasswordToken and a time to forgotPasswordExpiryTime
  getResetPasswordToken: function () {
    const resetToken = randomBytes(32).toString("hex");

    this.resetPasswordToken = createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
  },

  compareResetPasswordToken: async function (resetToken) {
    if (Date.now() > this.resetPasswordExpire) {
      return false;
    }
    const resetPasswordToken = createHash("sha256")
      .update(resetToken)
      .digest("hex");
    return resetPasswordToken === this.resetPasswordToken;
  },

  // generates & assigns a secret token to verifyToken and a time to verifyTokenExpire
  getVerifyToken: function () {
    const verifyToken = randomBytes(32).toString("hex");
    this.verifyToken = createHash("sha256").update(verifyToken).digest("hex");
    this.verifyTokenExpire =
      Date.now() +
      ENV_CONSTANTS.EMAIL_VERIFICATION_EXPIRY * 24 * 60 * 60 * 1000;

    return verifyToken;
  },

  compareVerifyToken: async function (verifyToken) {
    if (
      !(this.verifyToken && this.verifyTokenExpire) ||
      Date.now() > this.verifyTokenExpire
    ) {
      return null;
    } else {
      const encryptedVerifyToken = createHash("sha256")
        .update(verifyToken)
        .digest("hex");
      return encryptedVerifyToken === this.verifyToken;
    }
  },
};

// Delete user records which haven't been verified even after  days since the time of their creation
userSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: ENV_CONSTANTS.EMAIL_VERIFICATION_EXPIRY * 24 * 60 * 60,
    partialFilterExpression: { verifiedUser: false },
  }
);

const User = model("user", userSchema);

module.exports = User;
