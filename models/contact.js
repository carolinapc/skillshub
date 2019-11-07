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
    freezeTableName: true
  });


  return Contact;
};
