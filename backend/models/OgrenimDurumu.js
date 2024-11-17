'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OgrenimDurumu extends Model {
    static associate(models) {
      // Define associations here if necessary
    }
  }

  OgrenimDurumu.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    SiraNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Adi: {
      type: DataTypes.CHAR(7),
      allowNull: false,
      defaultValue: '',
      charset: 'utf8mb3', // Charset specification
      collate: 'utf8mb3_turkish_ci' // Collation specification
    }
  }, {
    sequelize,
    modelName: 'OgrenimDurumu',
    tableName: 'ogrenim_durumlari',
    timestamps: false,
    charset: 'utf8mb3',
    collate: 'utf8mb3_turkish_ci'
  });

  return OgrenimDurumu;
};
