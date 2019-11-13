const router = require("express").Router();
const contactController = require("../../controllers/contactController");

// Matches with "/api/contact"
router.route("/").get(contactController.findUserRequests);

// Matches with "/api/contact/clients"
router.route("/clients").get(contactController.findUserClients);

// Matches with "/api/contact/skill"
router.route("/skill").post(contactController.create);

// Matches with "/api/contact/skill/:id"
router.route("/skill/:id").get(contactController.findOneBySkill);

// Matches with "/api/contact/chat
router.route("/chat").put(contactController.update);


module.exports = router;