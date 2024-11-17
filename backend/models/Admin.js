'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Admin extends Model {
    // You can define associations here, if needed.
    static associate(models) {
      // Example association: Admin.hasMany(models.OtherModel);
    }
  }

  Admin.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(60),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci',
      },
      password: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci',
      },
      allowDuyuru: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      allowPhones: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      allowIPS: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      allowPersonel: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      allowAnket: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      allowMudurlukler: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      allowAdmins: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      accessToken: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'admins',
      timestamps: false, // Set to true if you want `createdAt` and `updatedAt` columns.
    }
  );

  return Admin;
};
