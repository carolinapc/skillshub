const db = require("../models");

// Defining methods for the Contacts
module.exports = {

  /*
  Gets all Clients requests (contacts)
  */
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

  /*
  Get a contact made by the client related to a skill passed. 
  It will create one if it wasn't found
  */
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
  },

  /*
  Get all contacts from user's skills
  */
  findByUserSkill: function (req, res) {
    
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to see contacts.");
    }
    else {
      db.Contact.findAll({
        include: [{ all: true, nested: true }],
        where: {
          [db.Sequelize.Op.and]: db.Sequelize.literal(`Skill.UserId = ${req.session.UserId}`),
          active: true,
          dealCLosed: false
        }
      })
      .then(dbModel => res.json(dbModel))
        .catch(err => { console.log(err); res.status(422).json(err) });
    }
    
  },

  /*
  Update a contact
  */
  update: function (req, res) {
    const contactId = req.body.id;
    delete req.body.id;
    console.log("data to be updated", req.body);
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update a contact.");
    }
    else {
      
      db.Contact
        .update(req.body, {where: {id: contactId} })
        .then(data => res.json(data))
        .catch(err => { console.log("ERROR WHEN UPDATING",err); res.status(422).json(err) });
    }
  }

}