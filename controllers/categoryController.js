const db = require("../models");

// Defining methods for the category
module.exports = {
  findAll: function (req, res) {
    db.Category
      .findAll({order: [['name', 'ASC']]})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}