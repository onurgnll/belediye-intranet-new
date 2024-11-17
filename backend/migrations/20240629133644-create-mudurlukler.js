'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mudurlukler', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      birim: {
        type: Sequelize.STRING(300),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      mudur: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      aciklama: {
        type: Sequelize.STRING(300),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      durum: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING(90),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mudurlukler');
  }
};
