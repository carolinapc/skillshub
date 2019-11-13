const geo = require("../utils/geo");

// Defining methods for the Contacts
module.exports = {
  getPostalCodeFromGeoLocation: function (req, res) {
    let pos = {
      lat: req.params.latitude,
      lng: req.params.longitude
    };

    geo.getPostalCode(pos).then(resp => {
      //filter only postal code for the first item
      let data = resp.data.results[0].address_components.filter(item => item.types.includes("postal_code"));
      res.json(data);
    }).catch(err => { console.log(err); res.status(422).json(err);});
  }
}