module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    responseID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'responses',
        key: 'responseID'
      }
    },
    questionID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'questions',
        key: 'questionID'
      }
    },
    answer_text: DataTypes.TEXT,
    choiceID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'choices',
        key: 'choiceID'
      }
    }
  }, {
    tableName: 'answers',
    timestamps: false
  });

  Answer.associate = function (models) {
    Answer.belongsTo(models.SurveyResponse, {
      foreignKey: 'responseID',
      onDelete: 'CASCADE'
    });
    Answer.belongsTo(models.Question, {
      foreignKey: 'questionID',
      onDelete: 'CASCADE'
    });
    Answer.belongsTo(models.Choice, {
      foreignKey: 'choiceID',
      onDelete: 'CASCADE'
    });
  };

  return Answer;
};
