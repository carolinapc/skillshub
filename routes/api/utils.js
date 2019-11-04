const router = require("express").Router();
const utilsController = require("../../controllers/utilsController");

// Matches with "/api/utils/uploadfile"
router.route("/uploadfile")
  .post(utilsController.uploadFile);

module.exports = router;