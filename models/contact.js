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
