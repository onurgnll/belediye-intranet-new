'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('choices', 'choices_ibfk_1');
    await queryInterface.addConstraint('choices', {
      fields: ['questionID'],
      type: 'foreign key',
      name: 'choices_ibfk_1',
      references: {
        table: 'questions',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('choices', 'choices_ibfk_1');
    await queryInterface.addConstraint('choices', {
      fields: ['questionID'],
      type: 'foreign key',
      name: 'choices_ibfk_1',
      references: {
        table: 'questions',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  }
};
