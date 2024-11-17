module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
      surveyID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'surveys',
          key: 'surveyID'
        }
      },
      question_text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      question_type: {
        type: DataTypes.ENUM('multiple_choice', 'text_input', 'multiple_selection'),
        allowNull: false
      }
    }, {
      tableName: 'questions',
      timestamps: false
    });
  
    Question.associate = function(models) {
      Question.belongsTo(models.Survey, { foreignKey: 'surveyID', onDelete: 'CASCADE' });
      Question.hasMany(models.Choice, { foreignKey: 'questionID', onDelete: 'CASCADE' });
      Question.hasMany(models.Answer, { foreignKey: 'questionID', onDelete: 'CASCADE' });
    };
  
    return Question;
  };
  