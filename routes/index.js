const express = require("express");
const router = express.Router();

const userRoutes = require("../controllers/userController");
const documentRoutes = require("../controllers/documentController");

router.use("/user", userRoutes);
router.use("/document", documentRoutes);

module.exports = router;