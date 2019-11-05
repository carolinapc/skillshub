const router = require("express").Router();
const userRoutes = require("./user");
const categoryRoutes = require("./category");
const skillRoutes = require("./skill");

// Add routes
router.use("/user", userRoutes);
router.use("/skill", skillRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
