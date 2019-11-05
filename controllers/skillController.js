const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    const { search, categoryId } = req.query;
    let where = {};
    
    if (categoryId) {
      where.CategoryId = categoryId;
    }
    if (search) {
      where.name = {
        [db.Sequelize.Op.like]: [`%${search}%`]
      };
    }
    
    db.Skill
      .findAll({
        include: [{ all: true }],
        where: where
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}