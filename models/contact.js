module.exports = function (sequelize, DataTypes) {
  let Contact = sequelize.define("Contact", {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priceType: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    chat: {
      type: DataTypes.TEXT,
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


  return Contact;
};
