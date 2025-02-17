'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mudurlukler extends Model {
    static associate(models) {
      // Define associations here if needed
      
      Mudurlukler.belongsTo(models.Personel, {
        foreignKey: 'mudur',
        as: 'mudurr' // Alias for the association
      });
    }
  }

  Mudurlukler.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    birim: {
      type: DataTypes.STRING(300),
      allowNull: false,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    mudur: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    aciklama: {
      type: DataTypes.STRING(300),
      allowNull: false,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    durum: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(90),
      allowNull: false,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    }
  }, {
    sequelize,
    modelName: 'Mudurlukler',
    tableName: 'mudurlukler',
    timestamps: false // Add this if your table does not have createdAt and updatedAt columns
  });

  return Mudurlukler;
};
