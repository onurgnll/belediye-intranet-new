module.exports = (sequelize, DataTypes) => {
  const SurveyResponse = sequelize.define('SurveyResponse', {
    surveyID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'surveys',
        key: 'surveyID'
      }
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'responses',
    timestamps: false
  });

  SurveyResponse.associate = function(models) {
    SurveyResponse.belongsTo(models.Client, { foreignKey: 'userID', as: "client" });
    SurveyResponse.belongsTo(models.Survey, { foreignKey: 'surveyID' });
    SurveyResponse.hasMany(models.Answer, { foreignKey: 'responseID', onDelete: 'CASCADE' });
  };

  return SurveyResponse;
};
