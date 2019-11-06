const router = require("express").Router();
const categoryController = require("../../controllers/categoryController");

// Matches with "/api/category"
router.route("/")
  .get(categoryController.findAll);

// Matches with "/api/category/grouped"
router.route("/grouped")
  .get(categoryController.findAllGrouped);

module.exports = router;