'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Telephone extends Model {
    static associate(models) {
      // Define associations here if needed
      Telephone.belongsTo(models.Mudurlukler, {
        foreignKey: 'departmentID',
        as: 'department' // Alias for the association
      });
    }
  }

  Telephone.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    departmentID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
  }, {
    sequelize,
    modelName: 'Telephone',
    tableName: 'telephone',
    timestamps: false // Add this if your table does not have createdAt and updatedAt columns
  });

  return Telephone;
};
