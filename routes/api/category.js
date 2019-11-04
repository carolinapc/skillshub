const router = require("express").Router();
const categoryController = require("../../controllers/categoryController");

// Matches with "/api/category"
router.route("/")
  .get(categoryController.findAll);

module.exports = router;