module.exports = function (sequelize, DataTypes) {
    let Skill = sequelize.define("Skill", {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: "User first name must have at least 3 and max 50 characters"
          }
        }
      },
      lastname: {
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
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      freezeTableName: true
    });
  
    Skill.associate = function (models) {
      Skill.belongsTo(models.Category, {
        
        foreignKey: {
          allowNull: false
        }
      });
  
      
    };  
  
    return Skill;
  };
  