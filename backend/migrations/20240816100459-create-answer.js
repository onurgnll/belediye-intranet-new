'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('answers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      responseID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'responses', // Name of the table in your database
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      questionID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'questions', // Name of the table in your database
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      answer_text: {
        type: Sequelize.TEXT
      },
      choiceID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'choices', // Name of the table in your database
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('answers');
  }
};
