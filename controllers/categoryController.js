const db = require("../models");

// Defining methods for the category
module.exports = {
  findAll: function (req, res) {
    db.Category
      .findAll({order: [['name', 'ASC']]})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //get categories that have most skills available
  findAllGrouped: function (req, res) {
    db.sequelize.query(`
      SELECT c.id as id, c.name as name, c.image, count(*) as tot 
      FROM Category c, Skill s  
      WHERE s.CategoryId = c.id and s.active = true
      GROUP BY c.id, c.name, c.image
      ORDER BY 3 DESC
      LIMIT 6;
    `,
    {
      raw: true,
      type: db.Sequelize.QueryTypes.SELECT
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
}