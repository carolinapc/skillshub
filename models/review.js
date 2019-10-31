module.exports = function (sequelize, DataTypes) {
  let Review = sequelize.define("Review", {
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 500],
          msg: "User review must have at least 3 and max 500 characters"
        }
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    } 
  },
  {
      freezeTableName: true
  });
      
// Review.associate = function (models) {
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

  return Review;
};

