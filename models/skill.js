module.exports = function (sequelize, DataTypes) {
    let Skill = sequelize.define("Skill", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: "User first name must have at least 3 and max 50 characters"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      pricetype: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (value === "") {
              throw new Error("Price type must be choose: per hour, per day or per job");
            }
            if (value !== "H" && value !== "D" && value !== "J") {
              throw new Error("Price type must be [H]our, [D]ay or [J]ob");
            }
          }
        }
      },
      zipcode: {
        type: DataTypes.STRING,
        allowNull: false
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
  
      Skill.hasMany(models.Review, {
        foreignKey: {
          allowNull: false
        }
      });

      Skill.hasMany(models.Contact, {
        foreignKey: {
          allowNull: false
        }
      });
      
    };  
  
    return Skill;
  };
  