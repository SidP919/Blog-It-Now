const express = require("express");
const {
  register,
  login,
  logOut,
  protectedRoute,
  passwordResetRequest,
  resetPassword,
  deleteAccount,
  verifyEmail,
} = require("../controllers/authController.js");
const authenticate = require("../middleware/authenticate.js");
const isVerifiedUser = require("../middleware/isVerifiedUser.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, isVerifiedUser, logOut);
router.get("/protected", authenticate, isVerifiedUser, protectedRoute);
router.post("/passwordResetRequest", passwordResetRequest);
router.post("/resetPassword", resetPassword);
router.post('/deleteAccount', authenticate, isVerifiedUser, deleteAccount);
router.post('/verifyEmail', verifyEmail);

module.exports = router;
