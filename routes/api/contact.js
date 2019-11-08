const router = require("express").Router();
const contactController = require("../../controllers/contactController");

// Matches with "/api/contact/skill/:id"
router.route("/").get(contactController.findUserRequests);
router.route("/skill/:id").get(contactController.findOrCreateBySkill);


module.exports = router;