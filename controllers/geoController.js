const geo = require("../utils/geo");

// Defining methods for the Contacts
module.exports = {
  getPostalCodeFromGeoLocation: function (req, res) {
    let pos = {
      lat: req.params.latitude,
      lng: req.params.longitude
    };

    geo.getPostalCode(pos).then(data => {
      res.json(data);
    }).catch(err => { console.log(err); res.status(422).json(err);});
  }
}