'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_name: {
        type: Sequelize.STRING(60),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      user_pass: {
        type: Sequelize.STRING(60),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      user_type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_creat_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(90),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      telephone: {
        type: Sequelize.STRING(12),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      accessToken: {
        type: Sequelize.STRING(1000),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
