const db = require("../models");

// Defining methods for the booksController
module.exports = {

  findUserRequests: function (req, res) {
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to see contacts.");
    }
    else {
      db.Contact.findAll({
        include: [{ all: true, nested: true }],
        where: {
          UserId: req.session.UserId,
          active: true,
          dealCLosed: false
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    }
  },

  findOrCreateBySkill: function (req, res) {
    
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to see contacts.");
    }
    else {

      let where = { active: true };
      let include = [{ all: true, nested: true }];

      where.UserId = req.session.UserId;
      where.dealClosed = false;

      if (req.params.id) {
        where.SkillId = req.params.id;
      }
      else {
        res.status(422).json("You need to select a skill to contact the user");
      }

      //create a new contact if it wasn't found
      db.Contact
        .findOrCreate({
          include: include,
          where: where,
          order: [['createdAt', 'DESC']],
          defaults: {
            SkillId: req.params.id,
            UserId: req.session.UserId
          }
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  }

}