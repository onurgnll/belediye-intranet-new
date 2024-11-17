'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('duyuru_resimler', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      duyuruID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'duyurular',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      resim: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('duyuru_resimler');
  }
};
