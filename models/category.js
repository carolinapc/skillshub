module.exports = function (sequelize, DataTypes) {
    let Category = sequelize.define("Category", {
      name: {
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
   
    return Category;
  };
  
