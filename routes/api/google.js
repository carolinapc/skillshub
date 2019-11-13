const router = require("express").Router();
const geoController = require("../../controllers/geoController");

// Matches with "/api/google/postalcode/:latitude/:longitude"
router.route("/postalcode/:latitude/:longitude").get(geoController.getPostalCodeFromGeoLocation);

module.exports = router;