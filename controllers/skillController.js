const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    const { search, categoryId, id } = req.query;
    let where = {active: true};
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
        where: where,
        order:[['createdAt', 'DESC'],[db.Review,'createdAt','DESC']]
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  addReview: function (req, res) {
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update an user.");
    }
    else {
      req.body.UserId = req.session.UserId;      
      db.Review.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));

    }
  },

  //get all skills without its relations and no filters
  allSkills: function (req, res) {
    db.Skill.findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}