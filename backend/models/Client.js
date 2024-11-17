'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Client.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    surname: {
      type: DataTypes.STRING(120),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    picture: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "",
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    tc: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: "",
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(120),
      allowNull: true,
      defaultValue: "",
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    detail: {
      type: DataTypes.STRING(120),
      allowNull: true,
      defaultValue: "",
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    contact: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: "",
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    ip: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    author: {
      type: DataTypes.STRING(90),
      allowNull: true,
      defaultValue: "",
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    }
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: false // Add this if your table does not have createdAt and updatedAt columns
  });

  return Client;
};
