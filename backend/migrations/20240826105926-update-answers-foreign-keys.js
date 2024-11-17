'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove existing foreign key constraints
    await queryInterface.removeConstraint('answers', 'answers_ibfk_1');
    await queryInterface.removeConstraint('answers', 'answers_ibfk_2');
    await queryInterface.removeConstraint('answers', 'answers_ibfk_3');

    // Add new foreign key constraints with CASCADE on delete
    await queryInterface.addConstraint('answers', {
      fields: ['responseID'],
      type: 'foreign key',
      name: 'answers_ibfk_1',
      references: {
        table: 'responses',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('answers', {
      fields: ['questionID'],
      type: 'foreign key',
      name: 'answers_ibfk_2',
      references: {
        table: 'questions',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('answers', {
      fields: ['choiceID'],
      type: 'foreign key',
      name: 'answers_ibfk_3',
      references: {
        table: 'choices',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove updated foreign key constraints
    await queryInterface.removeConstraint('answers', 'answers_ibfk_1');
    await queryInterface.removeConstraint('answers', 'answers_ibfk_2');
    await queryInterface.removeConstraint('answers', 'answers_ibfk_3');

    // Re-add original foreign key constraints with SET NULL on delete
    await queryInterface.addConstraint('answers', {
      fields: ['responseID'],
      type: 'foreign key',
      name: 'answers_ibfk_1',
      references: {
        table: 'responses',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addConstraint('answers', {
      fields: ['questionID'],
      type: 'foreign key',
      name: 'answers_ibfk_2',
      references: {
        table: 'questions',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addConstraint('answers', {
      fields: ['choiceID'],
      type: 'foreign key',
      name: 'answers_ibfk_3',
      references: {
        table: 'choices',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
