'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clients', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(120),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      surname: {
        type: Sequelize.STRING(120),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      picture: {
        type: Sequelize.STRING(200),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      tc: {
        type: Sequelize.STRING(16),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING(120),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      detail: {
        type: Sequelize.STRING(120),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      contact: {
        type: Sequelize.STRING(300),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      ip: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      author: {
        type: Sequelize.STRING(90),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clients');
  }
};
