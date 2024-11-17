'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('telephone', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      departmentID: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      phone: {
        type: Sequelize.STRING(100),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('telephone');
  }
};
