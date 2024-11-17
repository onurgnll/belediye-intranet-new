module.exports = (sequelize, DataTypes) => {
    const UserSurvey = sequelize.define('UserSurvey', {
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        surveyID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'surveys',
                key: 'surveyID'
            }
        }
    }, {
        tableName: 'user_surveys',
        timestamps: false
    });

    UserSurvey.associate = function (models) {
        UserSurvey.belongsTo(models.Survey, { foreignKey: 'surveyID' });
    };

    return UserSurvey;
};
