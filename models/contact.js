const Utils = require("../utils/functions");

module.exports = function (sequelize, DataTypes) {
  let Contact = sequelize.define("Contact", {
    agreedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true
    },
    priceType: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    chat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dealClosed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: function(contact) {
        const Skill = this.sequelize.models.Skill;
        //get the skills info to update Contact        
        return Skill.findByPk(contact.SkillId).then(skill => {
          contact.price = skill.price;
          contact.priceType = skill.priceType;
        }).catch(err => console.log(err));

      },
      afterCreate: function (contact) {
        const Skill = this.sequelize.models.Skill;

        //send email to provider
        return Skill.findOne({
          include: [{ all: true }],
          where: { id: contact.SkillId }
        }).then(skill => {
          let chat = JSON.parse(contact.chat);
          let htmlBody = `Hello ${skill.User.firstName}, 
                         <p>You have a new message from ${chat[0].user} regards to your skill "${skill.name}".</p>
                         <p>Please visit the website skillshub.heroku.com, on your clients page to see more details.</p>
                         <p>Skillshub Team</p>`;
          let subject = `Skillshub - New Contact from ${chat[0].user}`;
          
          Utils.sendEmail(skill.User.email, subject, htmlBody);
        }).catch(err => console.log(err));
      }
    }
  });

  Contact.associate = function (models) {
    Contact.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Contact.belongsTo(models.Skill, {
      foreignKey: {
        allowNull: false
      }
    });
  };  

  return Contact;
};
