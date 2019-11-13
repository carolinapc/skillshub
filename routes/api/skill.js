const router = require("express").Router();
const skillController = require("../../controllers/skillController");

// Matches with "/api/skill"
router.route("/").get(skillController.findAll);

// Matches with "/api/skill/all"
router.route("/all").get(skillController.allSkills);

// Matches with "/api/skill/review"
router.route("/review").post(skillController.addReview);

module.exports = router;