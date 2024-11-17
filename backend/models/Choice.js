module.exports = (sequelize, DataTypes) => {
    const Choice = sequelize.define('Choice', {
      questionID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'questions',
          key: 'questionID'
        }
      },
      choice_text: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'choices',
      timestamps: false
    });
  
    Choice.associate = function(models) {
      Choice.belongsTo(models.Question, { foreignKey: 'questionID' });
    };
  
    return Choice;
  };
  