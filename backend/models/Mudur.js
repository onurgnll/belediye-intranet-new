'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mudur extends Model {
    static associate(models) {
      // İlişki kurulacaksa buraya yazabilirsiniz
      this.belongsTo(models.Mudurlukler, { foreignKey: 'mudurluk' });
    }
  }

  Mudur.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      mudurluk: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      zktmudurlukid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Mudur',
      tableName: 'mudurs',
      timestamps: false, // createdAt ve updatedAt kullanılmıyorsa
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci',
    }
  );

  return Mudur;
};
