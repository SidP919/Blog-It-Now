const express = require("express");
const router = express.Router();
const { logger } = require("../utils/logger");
const { getOtherData, createOtherData } = require("../controllers/otherDataController");
const authenticate = require("../middleware/authenticate");
const isAdmin = require("../middleware/isAdmin");
const isVerifiedUser = require("../middleware/isVerifiedUser");

router.get("/getData", getOtherData);

router.post("/createData", authenticate, isVerifiedUser, isAdmin, createOtherData)

module.exports = router;