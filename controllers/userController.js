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
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //create new one
  create: function (req, res) {
    let pwd;
    //checks if the password field was passed
    try{
      pwd = req.body.password.trim();
    }
    catch (e) {
      console.log("The password field is expected!");
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
    let data = {};

    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update a user.");
    }
    else {
      
      //checks if the password field was passed
      try {
        pwd = req.body.password.trim();
        //password validations
        if (pwd === "") {
          res.status(500).end("Password must be informed!");
        }
        if (pwd.length < 8) {
          res.status(500).end("Password must have at least 8 characters!");
        }

        //crypt the password
        req.body.password = bcrypt.hashSync(pwd, 10);
      }
      catch (e) {
        //nothing to do, and the password won't be updated
      }

      //if there is file sent
      if (req.body.image !== "") {
                  
        //check if the exists in the temp folder
        if (fs.existsSync(`${uploadFolder}/tmp/${req.body.image}`)) {
          let fileExt = req.body.image.split(".");
          fileExt = fileExt[fileExt.length - 1];

          //create the new file name
          let fileName = `profile_${req.session.UserId}.${fileExt}`.toLowerCase();
        
          //rename the file and move it to definitive folder
          fs.renameSync(`${uploadFolder}/tmp/${req.body.image}`, `${uploadFolder}/${fileName}`);

          req.body.image = fileName;
          data.fileName = fileName;
        }
      }      

      db.User
        .update(req.body, { where: { id: req.session.UserId } })
        .then(() => res.json(data))
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
      .findOne({
        where: {
          email: req.body.email
        }
      })
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
              
            let body = `Hello ${user.firstname},`+
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
    db.User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(function (user) {
      
        if (user) {
          //compare the password sent with the hash stored in the database 
          if(bcrypt.compareSync(req.body.password, user.password)) {
            // Passwords match
            req.session.loggedin = true;
            req.session.UserId = user.id;
            req.session.UserName = user.firstname;
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
  }
};
