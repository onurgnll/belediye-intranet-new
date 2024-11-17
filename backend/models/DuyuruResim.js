'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DuyuruResim extends Model {
    static associate(models) {
      // Define the association with Duyuru
      DuyuruResim.belongsTo(models.Duyuru, {
        foreignKey: 'duyuruID',
        as: 'duyuru' // Alias for the association
      });
    }
  }

  DuyuruResim.init({
    duyuruID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Duyurus', // Table name for Duyuru
        key: 'id'
      }
    },
    resim: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DuyuruResim',
    tableName: 'duyuru_resimler',
    timestamps: false
  });

  return DuyuruResim;
};
