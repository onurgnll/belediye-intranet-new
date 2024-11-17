'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DestekResim extends Model {
    static associate(models) {
      // Define the association with Duyuru
      DestekResim.belongsTo(models.Destek, {
        foreignKey: 'destekID',
        as: 'destek' // Alias for the association
      });
    }
  }

  DestekResim.init({
    destekID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'destek', // Table name for Duyuru
        key: 'id'
      }
    },
    resim: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DestekResim',
    tableName: 'destek_resimler'
  });

  return DestekResim;
};
