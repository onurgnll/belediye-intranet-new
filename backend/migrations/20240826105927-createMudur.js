'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mudurs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(60),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      name: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      mudurluk: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      zktmudurlukid: {
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
    await queryInterface.dropTable('mudurs');
  }
};
