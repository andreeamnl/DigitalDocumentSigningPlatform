const express = require("express");
const router = express.Router();

const userRoutes = require("../controllers/userController");
const documentRoutes = require("../controllers/documentController");
const otpRoutes = require("../controllers/otpController");

router.use("/user", userRoutes);
router.use("/document", documentRoutes);
router.use("/otp", otpRoutes);

module.exports = router;