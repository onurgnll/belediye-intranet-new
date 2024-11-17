'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Duyuru extends Model {
    static associate(models) {
      // Define the association with DuyuruResim
      Duyuru.hasMany(models.DuyuruResim, {
        foreignKey: 'duyuruID',
        as: 'duyuruResimler', // Alias for the association
      });
    }
  }

  Duyuru.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isMain: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Duyuru',
    tableName: 'duyurular',
    timestamps: false
  });

  return Duyuru;
};
