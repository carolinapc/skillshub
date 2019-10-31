module.exports = function (sequelize, DataTypes) {
    let Category = sequelize.define("Category", {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: "Category name must have at least 3 and max 50 characters"
          }
        }
      },
    },
    {
      freezeTableName: true
    });
  

    // Category.associate = function (models) {
    //     Category.belongsTo(models.Skill, {
          
    //       foreignKey: {
    //         allowNull: false
    //       }
    //     });
    
        
    //   };  
    // // User.associate = function (models) {
    //   User.hasMany(models.Review, {
        
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
  
    //   User.hasMany(models.Service, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };  
  
    return Category;
  };
  
