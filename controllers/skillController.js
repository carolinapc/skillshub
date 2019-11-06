const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    const { search, categoryId, id } = req.query;
    let where = {};
    let include = [{ all: true }];

    if (id) {
      where.id = id;
      include = [{ all: true, nested: true }];
    }
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
        include: include,
        where: where
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}