'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Destek extends Model {
    static associate(models) {
      // Define the association with DuyuruResim
      Destek.hasMany(models.DestekResim, {
        foreignKey: 'destekID',
        as: 'destekResimler', // Alias for the association
      });
      Destek.hasMany(models.DestekCevap, {
        foreignKey: 'destekID',
        as: 'destekCevaplar', // Alias for the association
      });
      Destek.belongsTo(models.User, {
        foreignKey: 'userID',
        as: 'user', // Alias for the association
      });
    }
  }

  Destek.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
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
    },
    isAnswered: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Destek',
    tableName: 'destek',
    timestamps: true
  });

  return Destek;
};
