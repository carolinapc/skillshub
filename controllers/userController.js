const db = require("../models");
const uploadFolder = require("../config/config").uploadFolder;
const bcrypt = require("bcrypt");
let fs = require("fs");
let lib = require("../utils/functions");
let generator = require("generate-password");


// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    
    db.User
      .findOne({
        include: [{all:true, nested:true}],
        where:{
          id:req.params.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => {console.log(err);res.status(422).json(err)});
  },

  //create new one
  create: function (req, res) {
    let pwd;

    try {
      if (req.body.firstName.trim() === "") {
        res.status(422).end("First name must be informed!");        
      }
    }
    catch (e) {
      res.status(500).end("The firstname field is expected!");        
    }

    try {
      if (req.body.lastName.trim() === "") {
        res.status(422).end("Last name must be informed!");        
      }
    }
    catch (e) {
      res.status(500).end("The lastname field is expected!");        
    }

    try {
      if (req.body.firstName.trim() === "") {
        res.status(422).end("E-mail must be informed!");        
      }
    }
    catch (e) {
      res.status(500).end("The email field is expected!");        
    }

    //checks if the password field was passed
    try {
      pwd = req.body.password.trim();
    }
    catch (e) {
      res.status(500).end("The password field is expected!");        
    }

    //password validations
    if (pwd === "") {
      res.status(422).end("Password must be informed!");        
    }
    else if (pwd.length < 6) {
      res.status(422).end("Password must have at least 6 characters!");        
    }
    else {
      //crypt the password
      req.body.password = bcrypt.hashSync(pwd, 10);  
    }
    
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //update
  update: function (req, res) {

    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update a user.");
    }
    else {
      
      //if a file was uploaded (profile image)
      if (req.files) {
        let tmpFileName = req.files.file.name;
        
        //get the file extension
        let fileExt = tmpFileName.split(".");
        fileExt = fileExt[fileExt.length - 1];

        //give a name with the extension to the file
        let fileName = `profile_${req.session.UserId}.${fileExt}`.toLowerCase();
        req.body.image = fileName;
        req.session.UserImage = fileName;
        
        //upload the file to tmp folder
        req.files.file.mv(req.files.file.tempFilePath, function (err) {
          if (!err) {
            //move the file from the tmp folder to the final folder
            fs.renameSync(req.files.file.tempFilePath, `${uploadFolder}/${fileName}`);
          }
          else {
            res.status(400).end(err.message);
          }
        });  
        
      }

      db.User
        .update(req.body, { where: { id: req.session.UserId } })
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
    }
      
  },

  //removes
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //reset user's password
  resetPassword: function (req, res) {
    db.User
      .findOne({ where: { email: req.body.email } })
      .then(function (user) {
      
        if (user) {
          //creates a new pwd
          let newPassword = generator.generate({
            length: 10,
            numbers: true
          });
          
          //encrypt the password
          let cryptPwd = bcrypt.hashSync(newPassword, 10);

          //update the new password on user model
          db.User.update({
            password: cryptPwd
          },
          {
            where: {
              id: user.id
            }
          }).then(function () {
              
            let body = `Hello ${user.firstName},`+
            "<p>You've requested to reset your password on Skillshub website.</p>" +
            `<p>Your new password: <b>${newPassword}</b></p>` +
            "<p>We strongly recommend that you change it as soon as possible</p>" +
            "<p>Regards,</p>"+
            "<p>Skillshub Team</p>";
          
            lib.sendEmail(user.email, "Password Requested", body);
            res.status(200).end("Email has been sent!");          
          });
          
        }
        else {
          res.status(400).end("This e-mail is not registered!");
        }
      })
      .catch(err => res.status(422).json(err));
  },

  changePassword: function (req, res) {
        //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to change password.");
    }
    else {
          
      //checks if the password field was passed
      pwd = req.body.password.trim();
      newPwd = req.body.newPassword.trim();

      //password validations
      if (pwd === "") {
        res.status(500).end("Current password must be informed!");
      }

      //new password validations
      if (newPwd === "") {
        res.status(500).end("New password must be informed!");
      }
      if (newPwd.length < 6) {
        res.status(500).end("New password must be at least 6 characters!");
      }
    
      //crypt new password
      newPwd = bcrypt.hashSync(newPwd, 10);

      db.User.findOne({ where: { id: req.session.UserId } })
        .then(user => {
          //if old password match
          if (bcrypt.compareSync(pwd, user.password)) {
            //change it
            db.User
              .update({ password: newPwd }, { where: { id: req.session.UserId } })
              .then(user => res.json(user))
              .catch(err => res.status(422).json(err));
          }
          else {
            res.status(422).end("Incorrect password!");    
          }
        })
        .catch(err => res.status(422).json(err));
    }    
  },

  //authenticate user (sign in)
  auth: function (req, res) {
    
    try {
      //check if the required fields are empty
      if (req.body.email.trim() === "" || req.body.password.trim() === "") {
        res.status(400).end("E-mail and/or Password must be informed!");        
      }      
    }
    catch (e) {
      res.status(422).end("email and password fields must be passed!");
    }
    
    //find the user by email in the database
    db.User.findOne({ where: { email: req.body.email } })
      .then(function (user) {
      
        if (user) {
          //compare the password sent with the hash stored in the database 
          if(bcrypt.compareSync(req.body.password, user.password)) {
            // Passwords match
            req.session.loggedin = true;
            req.session.UserId = user.id;
            req.session.UserName = user.firstName;
            req.session.UserLastName = user.lastName;
            req.session.UserImage = user.image;
            res.status(200).json(req.session);
              
          } else {
            // Passwords don't match
            res.status(422).end("Incorrect Username and/or Password!");    
          }
          
        }
        else {
          res.status(422).end("User was not found!");    
        }
      })
      .catch(err => res.status(422).json(err));
  },

  //user signout
  signout: function (req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.status(422).json(err);  
      }
      else {
        res.status(200).end("User was signed out successfully!");  
      }
    });
  },

  //get user session data
  getUserSession: function (req, res) {
    if (req.session.loggedin) {
      res.status(200).json(req.session);
    }
    else {
      res.status(200).json({ loggedin: false });
    }
  },

  //get all user account data
  getUserAccount: function (req, res) {
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update a user.");
    }
    else {
      db.User.findOne({
        where: {
          id: req.session.UserId
        }
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  },
  //get the user skills
  getUserSkills: function (req, res) {
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update a user.");
    }
    else {
      db.Skill.findAll({
        include: [{all:true}],
        where: {
          UserId: req.session.UserId
        },
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  },

  //update user skill
  createUserSkill: function (req, res) {
    delete req.body.id;
    req.body.UserId = req.session.UserId;

    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update a skill.");
    }
    else {
      db.Skill.create(
        req.body
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    }
  },

  //update user skill
  updateUserSkill: function (req, res) {
    const skillId = req.body.id;
    delete req.body.id;

    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update a skill.");
    }
    else {
      db.Skill.update(
        req.body,
        {
          where: {
            id: skillId,
            UserId: req.session.UserId //guarantees an update only for if the skill belongs to the logged user
          }
        }
      )
      .then(dbModel => res.json(dbModel))
        .catch(err => { console.log(err); res.status(422).json(err) });
    }
  }
};
