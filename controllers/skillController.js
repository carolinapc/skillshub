const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Skill
      .find({
        include: [{all:true}],
        order: [["CategoryId", "ASC"]]
      })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}