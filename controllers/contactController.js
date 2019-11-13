const db = require("../models");
const Moment = require("moment");

// Defining methods for the Contacts
module.exports = {

  /*
  Gets all requests made by the user
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
  Get all clients from user
  */
  findUserClients: function (req, res) {
    
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
  Get a contact made by the client related to a skill passed that is still opened
  */
 findOneBySkill: function (req, res) {
    
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

    db.Contact
      .findOne({
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
      res.status(400).end("You need to sign in to see contacts.");
    }
    else if (req.body.text === "") {
      res.status(400).end("A text must be informed.");
    }
    else {
      req.body.UserId = req.session.UserId;
      console.log("text", req.body.text);
      
      let chat = [];
      
      chat.push({
        text: req.body.text,
        user: `${req.session.UserName} ${req.session.UserLastName}`,
        dateTime: Moment().format('YYYYMMDDHHMMSS')
      });

      req.body.chat = [];
      req.body.chat = JSON.stringify(chat);

      delete req.body.text;
      console.log(req.body);
      db.Contact.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
    }
  },
 
  /*
  Update a contact
  */
  update: function (req, res) {
    const contactId = req.body.id;
    delete req.body.id;
    
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update a contact.");
    }
    else {
      
      db.Contact
        .update(req.body, {where: {id: contactId} })
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
    }
  }

}