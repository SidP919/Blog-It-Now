const User = require("./../models/userSchema.js");
const cookieOptions = require("../models/utils/authCookieOptions.js");
const getUniqueUsername = require("../utils/getUniqueUsername.js");
const { logger } = require("../utils/logger.js");
const ENV_CONSTANTS = require("../constants/config.contants.js");
const sendEmail = require("../utils/email/sendEmail.js");

/****************************************************************************************
 * @REGISTER
 * @route http://localhost:4000/api/v1/auth/register
 * @requestType POST
 * @description User SignUp Controller which registers/creates a new user
 * @parameters fullname, username, email, password, favorite
 * @returns JSON object( containing response message)
 **************************************************************************************/
const register = async (req, res) => {
  try {
    // Destructuring the required info from signup request's body object
    const { fullname, email, password, favoriteContent } = req.body;
    let { username } = req.body;
    // Check if all required info was sent in signup request or not
    if (!(fullname && email && password && favoriteContent)) {
      //omitted username from this check since username is not a mandatory field
      return res.status(400).json({
        success: false,
        message:
          "Mandatory fields cannot be empty! Please fill them & try again.",
      });
    }

    // Check if email sent in signup request is unique or not
    const ifExistingUser = await User.findOne({ email: email.toLowerCase() });
    if (ifExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User with given email-id already exists! Please provide a different email-id or try login with same email-id",
      });
    }

    // If username is sent in signup request
    if (username) {
      // Check if username sent in signup request is unique or not
      const ifExistingUsername = await User.findOne({
        username: username.toLowerCase(),
      });
      if (ifExistingUsername) {
        return res.status(400).json({
          success: false,
          message:
            "User with given username already exists! Please provide a different Username or leave it blank so that we can assign you a unique username.",
        });
      }
    } else {
      // If username is not sent in SignUp request:
      let ifExistingUsername = true;
      const noOfDigitsInEmail = email.match(/\d/g)?.length;
      let noOfRandomDigits = noOfDigitsInEmail < 3 ? 3 - noOfDigitsInEmail : 0;
      do {
        username = getUniqueUsername(email.toLowerCase(), noOfRandomDigits);
        if (username.length < 8) {
          ++noOfRandomDigits;
          continue;
        }
        ifExistingUsername = await User.findOne({
          username: username.toLowerCase(),
        });
        ++noOfRandomDigits;
      } while (ifExistingUsername && noOfRandomDigits < 10);
    }

    // create User account
    const userResponse = await User.create({
      fullname,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      favoriteContent,
    })
      .then((newUser) => {
        // if user created successfully:
        newUser.password = undefined; // value of password will be protected after this line
        return newUser;
      })
      .catch((error) => {
        if (error?.errors?.password?.value) {
          error.errors.password.value = undefined; //for security reasons
        }
        if (error?.errors?.password?.properties?.password) {
          error.errors.password.properties.password = undefined; //for security reasons
        }
        // if user creation failed:
        logger("Error while user creation:", error);
        return error.message;
      });

    if (!userResponse.email) {
      return res.status(401).json({
        success: false,
        message: userResponse
          ?.split(":")
          .filter((w, i) => i !== 1)
          .join("! Reason: "),
      });
    }

    // generate verifyToken for user
    const verifyToken = await userResponse.getVerifyToken();

    // update user in DB with verifyToken Data
    const unverifiedUser = await User.findOneAndUpdate(
      { _id: userResponse._id },
      {
        verifyToken: userResponse.verifyToken,
        verifyTokenExpire: userResponse.verifyTokenExpire,
      }
    ).then(async () => {
      const tempUser = await User.findOne({ _id: userResponse._id });
      return tempUser;
    });

    const link = `${ENV_CONSTANTS.CLIENT_URL}/verifyEmail?verifyToken=${verifyToken}&userId=${unverifiedUser._id}`;

    const isMailSent = await sendEmail(
      unverifiedUser.email,
      `${ENV_CONSTANTS.APP_NAME} - Welcome ${unverifiedUser.fullname}`,
      {
        name: unverifiedUser.fullname,
        link: link,
        appOwner: ENV_CONSTANTS.CLIENT_NAME,
        appName: ENV_CONSTANTS.APP_NAME,
        appHome: ENV_CONSTANTS.CLIENT_URL,
        appEmail: ENV_CONSTANTS.APP_EMAIL,
      },
      "verification.handlebars"
    );

    if (isMailSent === true) {
      // send success response:
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        userData: {
          username: userResponse.username,
          fullname: userResponse.fullname,
          email: userResponse.email,
          favoriteContent: userResponse.favoriteContent,
        },
      });
    } else {
      console.error(isMailSent);
      const deletedUser = await User.findByIdAndDelete(unverifiedUser._id);
      res.status(400).json({ success: false, message: 'Sorry! We were unable to send you a verification email. Please try registering again or contact us if this keeps happening for more than 24hrs.' });
    }
  } catch (error) {
    logger("Registeration Error:", error);
    res.status(405).json({
      success: false,
      message: "Error occurred while registering the new user.",
    });
  }
};

/*************************************************************************************
 * @LOGIN
 * @route http://localhost:4000/api/v1/auth/login
 * @requestType POST
 * @description User Login Controller for logging an existing/registered user
 * @parameters emailOrUsername and password
 * @returns JSON object( containing response message, logged in User object and token)
 **************************************************************************************/
const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Check if all required info was sent in login request or not
    if (!(emailOrUsername && password)) {
      return res.status(400).json({
        success: false,
        message:
          "Mandatory fields cannot be empty! Please fill them & try again.",
      });
    }
    // Check if the user exists with the provided email or username
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername.toLowerCase() },
      ],
    })
      .select("+password")
      .catch((error) => {
        logger("Invalid Email or Username Error:", error);
        return null;
      });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or username!" });
    }

    // Compare the password
    const isPasswordValid = await user.comparePassword(password);
    user.password = undefined;
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // check if verified user
    const isVerifiedUser = user.verifiedUser;

    if (!isVerifiedUser) {
      return res.status(401).json({
        success: false,
        message: `This user account hasn't been verified yet. If you have registered within the last ${ENV_CONSTANTS.EMAIL_VERIFICATION_EXPIRY} days, then please check your registered email box and find an email with subject: "${ENV_CONSTANTS.APP_NAME} - Welcome ${user.fullname}" for more details.`,
      });
    }

    // Generate a JWT token
    const token = user.getJwtToken();

    // set token in cookies:
    res.cookie("token", token, cookieOptions);

    // set header- token
    res.setHeader("Authorization", `Bearer ${token}`);

    // send success response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      userData: {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        favoriteContent: user.favoriteContent,
      },
    });
  } catch (error) {
    logger("Login Error:", error);
    res.status(405).json({
      success: false,
      message: `Error occurred while logging the user.`,
    });
  }
};

/*************************************************************************************
 * @LOGOUT
 * @route http://localhost:4000/api/v1/auth/logout
 * @requestType POST
 * @description User LogOut Controller for logging out an existing/registered user
 * @parameters none
 * @returns JSON object( containing response result and message)
 **************************************************************************************/
const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      expires: new Date(),
      httpOnly: true,
    });

    res.setHeader("Authorization", "");
    res.status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    logger("LogOut Error:", error);
    res.status(405).json({
      success: false,
      message: "Error Occured while logging out the user.",
    });
  }
};

/*************************************************************************************
 * @PROTECTED_ROUTE
 * @route http://localhost:4000/api/v1/auth/protected
 * @requestType GET
 * @description protectedRoute controller is for testing if authorization working properly or not
 * @parameters none
 * @returns JSON object( containing response result and message)
 **************************************************************************************/
const protectedRoute = async (req, res) => {
  try {
    // This route handler will only be executed if the user is authenticated
    const user = req.user;
    if (!user) {
      res.status(403).json({
        success: true,
        message: "Either New Visitor or a Reload happened.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User has basic access rights",
        userData: {
          fullname: user.fullname,
          email: user.email,
          username: user.username,
          favoriteContent: user.favoriteContent,
        },
      });
    }
  } catch (error) {
    logger("Protected Route Error:", error);
    res.status(405).json({
      success: false,
      message: "Error occured while accessing the protected route.",
    });
  }
};

/*************************************************************************************
 * @PASSWORD_RESET_REQUEST
 * @route http://localhost:4000/api/v1/auth/passwordResetRequest
 * @requestType POST
 * @description Password reset request Controller for sending email for resetting password
 * @parameters email
 * @returns JSON object( containing response message, logged in User object and token)
 **************************************************************************************/
const passwordResetRequest = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if required info was sent in request or not
    if (!email) {
      return res.status(400).json({
        success: false,
        message:
          "Mandatory fields cannot be empty! Please fill them & try again.",
      });
    }
    // Check if the user exists with the provided email
    const user = await User.findOne({ email: email.toLowerCase() })
      //   .select("+password")
      .catch((error) => {
        logger(
          "Password Reset Request: Error while fetching the user data from DB:",
          error
        );
        return res.status(401).json({ success: false, message: error.message });
      });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or username!" });
    }

    // set resetPasswordToken & resetPasswordExpire in user
    const resetToken = user.getResetPasswordToken();

    // update user in DB with new data
    const newUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        resetPasswordToken: user.resetPasswordToken,
        resetPasswordExpire: user.resetPasswordExpire,
      }
    ).then(async () => {
      const tempUser = await User.findOne({ email: email.toLowerCase() });
      return tempUser;
    });

    const link = `${ENV_CONSTANTS.CLIENT_URL}/resetPassword?resetPasswordToken=${resetToken}&userId=${newUser._id}`;

    sendEmail(
      newUser.email,
      `${ENV_CONSTANTS.APP_NAME} - Password Reset Request`,
      {
        name: newUser.fullname,
        link: link,
        appOwner: ENV_CONSTANTS.CLIENT_NAME,
        appName: ENV_CONSTANTS.APP_NAME,
        appHome: ENV_CONSTANTS.CLIENT_URL,
        appEmail: ENV_CONSTANTS.APP_EMAIL,
      },
      "requestResetPassword.handlebars"
    );

    // send success response
    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to registered email-id.",
    });
  } catch (error) {
    logger("Password Reset Request Error:", error);
    res.status(405).json({
      success: false,
      message: "Error occurred while sending password reset request.",
    });
  }
};

/*************************************************************************************
 * @RESET_PASSWORD
 * @route http://localhost:4000/api/v1/auth/resetPassword
 * @requestType POST
 * @description Password reset Controller for resetting password of an existing/registered user
 * @parameters _id, resetPasswordToken, password
 * @returns JSON object( containing response message)
 **************************************************************************************/
const resetPassword = async (req, res) => {
  const { _id, resetPasswordToken, password } = req.body;

  try {
    // Check if required info was sent in request or not
    if (!(_id && resetPasswordToken && password)) {
      return res.status(400).json({
        success: false,
        message:
          "Request doesn't contain valid information to reset the password! Please check the link & try again.",
      });
    }
    // Check if the user exists with the provided userId
    const user = await User.findOne({ _id })
      // .select("+password")
      .catch((error) => {
        logger(
          "Password Reset Request: Error while fetching the user data from DB:",
          error
        );
        return res.status(401).json({ success: false, message: error.message });
      });
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Request doesn't contain valid information about the user! Please check the link & try again.",
      });
    }

    // compare resetPasswordToken in user
    const isValidResetPasswordToken = await user.compareResetPasswordToken(
      resetPasswordToken
    );

    if (!isValidResetPasswordToken) {
      await User.findOneAndUpdate(
        { _id },
        {
          $unset: { resetPasswordToken: 1, resetPasswordExpire: 1 },
        }
      );
      return res.status(401).json({
        success: false,
        message: "Your reset password token has been expired!",
      });
    }

    // generate encrypted pwd in user
    await user.encryptPassword(password);

    // update user in DB with new data
    const newUser = await User.findOneAndUpdate(
      { _id },
      {
        $set: {
          password: user.password,
        },
        $unset: { resetPasswordToken: 1, resetPasswordExpire: 1 },
      },
      { new: true }
    );

    sendEmail(
      newUser.email,
      `${ENV_CONSTANTS.APP_NAME} - Password Change Confirmation`,
      {
        name: newUser.fullname,
        mainMsg: `Your ${ENV_CONSTANTS.APP_NAME} account password has been reset successfully.`,
        footerNote:
          "If this wasn't you, then please reset your password immediately",
        appOwner: ENV_CONSTANTS.CLIENT_NAME,
        appName: ENV_CONSTANTS.APP_NAME,
        appHome: ENV_CONSTANTS.CLIENT_URL,
        appEmail: ENV_CONSTANTS.APP_EMAIL,
      },
      "confirmation.handlebars"
    );

    // send success response
    res.status(200).json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    logger("Reset Password Error:", error);
    res.status(405).json({
      success: false,
      message: "Error occurred while resetting the password.",
    });
  }
};

/*************************************************************************************
 * @DELETE_ACCOUNT
 * @route http://localhost:4000/api/v1/auth/deleteAccount
 * @requestType POST
 * @description Delete Account Controller for deleting account of a logged-in user
 * @parameters email, password
 * @returns JSON object( containing response message)
 **************************************************************************************/
const deleteAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if required info was sent in request or not
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message:
          "Request doesn't contain valid information to delete the account!",
      });
    }
    // Check if the user exists with the provided email
    const user = await User.findOne({ email })
      .select("+password")
      .catch((error) => {
        logger(
          "Delete Account: Error while fetching user data from DB:",
          error
        );
        return res.status(401).json({ success: false, message: error.message });
      });
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "We cannot find a User with provided information.\nPlease try again if you believe this is a mistake.",
      });
    }

    // Compare the password
    const isPasswordValid = await user.comparePassword(password);
    user.password = undefined;
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Check your credentials! Provided Password is invalid.",
      });
    }

    // delete the account
    const deletedUser = await User.findByIdAndDelete(user._id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message:
          "We cannot find a User with provided information.\nPlease try again if you believe this is a mistake.",
      });
    }

    res.clearCookie("token", {
      expires: new Date(),
      httpOnly: true,
    });

    res.setHeader("Authorization", "");

    // send success response
    res.status(200).json({
      success: true,
      message: `Your ${ENV_CONSTANTS.APP_NAME} Account has been successfully deleted.`,
      userData: {
        username: deletedUser.username,
        fullname: deletedUser.fullname,
        email: deletedUser.email,
        favoriteContent: deletedUser.favoriteContent,
      },
    });

    sendEmail(
      deletedUser.email,
      `${ENV_CONSTANTS.APP_NAME} - Account Deletion Confirmation`,
      {
        name: deletedUser.fullname,
        mainMsg: `Your ${ENV_CONSTANTS.APP_NAME} account has been deleted successfully.`,
        footerNote: "You can always join us back by creating a new account",
        appOwner: ENV_CONSTANTS.CLIENT_NAME,
        appName: ENV_CONSTANTS.APP_NAME,
        appHome: ENV_CONSTANTS.CLIENT_URL,
        appEmail: ENV_CONSTANTS.APP_EMAIL,
      },
      "confirmation.handlebars"
    );
  } catch (error) {
    logger("Delete Account Error:", error);
    res.status(405).json({
      success: false,
      message: "Error occurred while deleting the account.",
    });
  }
};

/*************************************************************************************
 * @VERIFY_EMAIL
 * @route http://localhost:4000/api/v1/auth/verifyEmail
 * @requestType POST
 * @description Verify Email Controller for verifying newly registered user's email
 * @parameters _id, verifyToken
 * @returns JSON object( containing response message)
 **************************************************************************************/
const verifyEmail = async (req, res) => {
  const { _id, verifyToken } = req.body;

  try {
    // Check if required info was sent in request or not
    if (!(_id && verifyToken)) {
      return res.status(400).json({
        success: false,
        message:
          "Request contains invalid information to verify the email! Please check the link & try again.",
      });
    }
    // Check if the user exists with the provided userId
    const user = await User.findOne({ _id })
      // .select("+password")
      .catch((error) => {
        logger(
          "Password Reset Request: Error while fetching the user data from DB:",
          error
        );
        return res.status(401).json({ success: false, message: error.message });
      });
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Request contains invalid information about the user! Please check the link & try again.",
      });
    }

    if (user.verifiedUser) {
      return res.status(401).json({
        success: false,
        message:
          "You have already verified your email. Please proceed to Login.",
      });
    }

    // compare verifyToken in user
    const isValidVerificationToken = await user.compareVerifyToken(verifyToken);

    if (isValidVerificationToken === null) {
      return res.status(401).json({
        success: false,
        message:
          "Your verification link seems to have been expired now! Please register again to create your account.",
      });
    } else if (!isValidVerificationToken) {
      return res.status(401).json({
        success: false,
        message: `Invalid Verification Link! Please check the link and try again.`,
      });
    }

    // update user in DB with new data
    const newUser = await User.findOneAndUpdate(
      { _id },
      {
        $set: {
          verifiedUser: true,
        },
        $unset: { verifyToken: 1, verifyTokenExpire: 1 },
      },
      { new: true }
    );

    sendEmail(
      newUser.email,
      `${ENV_CONSTANTS.APP_NAME} - Email Verified Successfully`,
      {
        name: newUser.fullname,
        mainMsg: `Your email account for ${ENV_CONSTANTS.APP_NAME} has been verified successfully.`,
        footerNote: `Now, you can proceed to login, if not already done, and access your ${ENV_CONSTANTS.APP_NAME} account to access user-specific features and more`,
        appOwner: ENV_CONSTANTS.CLIENT_NAME,
        appName: ENV_CONSTANTS.APP_NAME,
        appHome: ENV_CONSTANTS.CLIENT_URL,
        appEmail: ENV_CONSTANTS.APP_EMAIL,
      },
      "confirmation.handlebars"
    );

    // send success response
    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    logger("Email Verification Error:", error);
    res.status(405).json({
      success: false,
      message: "Error occurred while verifying the email.",
    });
  }
};

module.exports = {
  register,
  login,
  logOut,
  protectedRoute,
  passwordResetRequest,
  resetPassword,
  deleteAccount,
  verifyEmail,
};
