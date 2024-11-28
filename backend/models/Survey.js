module.exports = (sequelize, DataTypes) => {
    const Survey = sequelize.define('Survey', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      isMain: {
        type: DataTypes.TINYINT,
        defaultValue: 0
      },
      isActive: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      }
    }, {
      tableName: 'surveys',
      timestamps: false
    });
  
    Survey.associate = function(models) {
      Survey.hasMany(models.Question, { foreignKey: 'surveyID', onDelete: 'CASCADE' });
      Survey.hasMany(models.SurveyResponse, { foreignKey: 'surveyID', onDelete: 'CASCADE' });
    };
  
    return Survey;
  };
  