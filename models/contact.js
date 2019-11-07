module.exports = function (sequelize, DataTypes) {
  let Contact = sequelize.define("Contact", {
    agreedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    note: {
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
