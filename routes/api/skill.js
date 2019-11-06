const router = require("express").Router();
const skillController = require("../../controllers/skillController");

// Matches with "/api/skill"
router.route("/")
  .get(skillController.findAll);
  //.put(skillController.update)
  //.post(skillController.create);

// Matches with "/api/skill/review"
router.route("/review")
  .post(skillController.addReview);

module.exports = router;