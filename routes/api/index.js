const router = require("express").Router();
const userRoutes = require("./user");
const categoryRoutes = require("./category");
const skillRoutes = require("./skill");
const contactRoutes = require("./contact");
const googleRoutes = require("./google");

// Add routes
router.use("/user", userRoutes);
router.use("/skill", skillRoutes);
router.use("/category", categoryRoutes);
router.use("/contact", contactRoutes);
router.use("/google", googleRoutes);

module.exports = router;
