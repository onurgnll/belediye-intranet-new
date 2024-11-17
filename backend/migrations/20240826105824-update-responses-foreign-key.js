'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('responses', 'responses_ibfk_1');
    await queryInterface.addConstraint('responses', {
      fields: ['surveyID'],
      type: 'foreign key',
      name: 'responses_ibfk_1',
      references: {
        table: 'surveys',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('responses', 'responses_ibfk_1');
    await queryInterface.addConstraint('responses', {
      fields: ['surveyID'],
      type: 'foreign key',
      name: 'responses_ibfk_1',
      references: {
        table: 'surveys',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  }
};
