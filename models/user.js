module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "User first name must have at least 3 and max 50 characters"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "User last name must have at least 3 and max 50 characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "This e-mail is already registered"
      },
      validate: {
        len: {
          args: [1, 200],
          msg: "E-mail must have max 200 characters"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 60],
          msg: "Password must have at least 6 characters"
        }
      }
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    freezeTableName: true
  });

  User.associate = function (models) {
    User.hasMany(models.Skill, {
      
      foreignKey: {
        allowNull: false
      }
    });

    User.hasMany(models.Contact, {
      foreignKey: {
        allowNull: false
      }
    });
  };  

  return User;
};
