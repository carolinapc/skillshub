const router = require("express").Router();
const skillController = require("../../controllers/skillController");

// Matches with "/api/skill"
router.route("/")
  .get(skillController.findAll)
  .put(skillController.update)
  .post(skillController.create);

module.exports = router;