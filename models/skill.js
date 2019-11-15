const Geo = require("../utils/geo");

module.exports = function (sequelize, DataTypes) {
    let Skill = sequelize.define("Skill", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: "Business name must have at least 3 and max 50 characters"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
          customValidator(value) {
            if (value === "") {
              throw new Error("Price must be informed");
            }
            if (isNaN(value)) {
              throw new Error("Price must be decimal");
            }
          }
        }

      },
      priceType: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (value === "") {
              throw new Error("Price type must be chosen: per hour, day or job");
            }
            if (value !== "H" && value !== "D" && value !== "J") {
              throw new Error("Price type must be [H]our, [D]ay or [J]ob");
            }
          }
        }
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "You must provide the zip code"
          },
          customValidator(value) {
            if (value === "") {
              throw new Error("Zip code must be informed");
            }
          }
        }
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
      }
    },
    {
      freezeTableName: true, //tratar o retorno do axios
      hooks: {
        afterValidate: function (skill) {
          return Geo.zipToGeo(skill.zipCode).then(res => {
            skill.latitude = res.data.results[0].geometry.location.lat;
            skill.longitude = res.data.results[0].geometry.location.lng;
          }).catch(err => console.log("Error", err));
        }
      }
    });
  
    Skill.associate = function (models) {
      Skill.belongsTo(models.Category, {
        foreignKey: {
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "You must select a category"
            },
            customValidator(value) {
              if (value === "") {
                throw new Error("Category must be informed");
              }
            }
          }
        }
      });

      Skill.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "You must inform an user"
            },
            customValidator(value) {
              if (value === "") {
                throw new Error("User must be informed");
              }
            }
          }
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
  