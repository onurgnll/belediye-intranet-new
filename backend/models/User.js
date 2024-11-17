'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    user_pass: {
      type: DataTypes.STRING(60),
      allowNull: false,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    user_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_creat_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(90),
      allowNull: false,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    telephone: {
      type: DataTypes.STRING(12),
      allowNull: false,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accessToken: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false // Add this if your table does not have createdAt and updatedAt columns
  });

  return User;
};
