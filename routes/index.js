const express = require("express");
const router = express.Router();

const userRoutes = require("../controllers/userController");
const documentRoutes = require("../controllers/documentController");
const otpRoutes = require("../controllers/otpController");
const emailVerificationRoutes = require("../controllers/emailVerificationController");
const documentSigningRoutes = require("../controllers/signingController");

router.use("/user", userRoutes);
router.use("/document", documentRoutes);
router.use("/otp", otpRoutes);
router.use("/email", emailVerificationRoutes);
router.use("/sign", documentSigningRoutes);

module.exports = router;