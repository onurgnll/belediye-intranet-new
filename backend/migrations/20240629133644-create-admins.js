'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admins', {
      user_id: {
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
      password: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      allowDuyuru: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      allowPhones: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      allowIPS: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      allowPersonel: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      allowAnket: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      allowMudurlukler: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      allowAdmins: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      accessToken: {
        type: Sequelize.STRING(1000),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admins');
  }
};
