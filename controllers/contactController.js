const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findBySkill: function (req, res) {
    
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to see contacts.");
    }
    else {

      let where = { active: true };
      let include = [{ all: true, nested: true }];

      where.UserId = req.session.UserId;

      if (req.query.id) {
        where.SkillId = id;
      }
      else {
        res.status(422).json("You need to select a skill to contact the user");
      }

      db.Contact
        .findAll({
          include: include,
          where: where,
          order: [['createdAt', 'DESC']]
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  },

  create: function (req, res) {
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to contact someone");
    }
    else {
      req.body.UserId = req.session.UserId;      
      
      db.Contact.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));

    }
  }
}