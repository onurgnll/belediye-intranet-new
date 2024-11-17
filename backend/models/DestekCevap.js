'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DestekCevap extends Model {
    static associate(models) {
      // Define associations here if necessary
      DestekCevap.belongsTo(models.Destek, {
        foreignKey: 'destekID',
        as: 'destek' // Alias for the association
      });
    }
  }

  DestekCevap.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destekID: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'DestekCevap',
    tableName: 'destek_cevap',
    timestamps: true
  });

  return DestekCevap;
};
