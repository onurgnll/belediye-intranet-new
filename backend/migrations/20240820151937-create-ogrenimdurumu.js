'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ogrenim_durumlari', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      SiraNo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Adi: {
        type: Sequelize.STRING(25),
        allowNull: true,
        defaultValue: '',
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      }
    }, {
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci',
      engine: 'InnoDB',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ogrenim_durumlari');
  }
};
