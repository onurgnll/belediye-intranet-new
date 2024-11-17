'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('destek_resimler', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      destekID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'destek', // The table name
          key: 'id'
        },
        onDelete: 'CASCADE' // Optional: this ensures that if a `Destek` is deleted, its related `DestekResim` entries are also deleted
      },
      resim: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('destek_resimler');
  }
};
