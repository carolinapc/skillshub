module.exports = function (sequelize, DataTypes) {
  let Review = sequelize.define("Review", {
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 500],
          msg: "User review must have at least 3 and max 500 characters"
        }
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    } 
  },
  {
    freezeTableName: true,
    hooks: {
      afterCreate: function (review) {
        let Skill = this.sequelize.models.Skill;
        
        Review.count({ where: { SkillId: review.SkillId } }).then(tot => {
          Review.sum("score", { where: { SkillId: review.SkillId } }).then(sum => {
            let skillScore = Math.round(sum / tot);

            //update the skill score
            Skill.update({
              score: skillScore
            },
            {
              where: { id: review.SkillId }
            }).then(() => {
              console.log("Skill score was updated!");          
            });
          });
        });
      }
    }
  });
      
  Review.associate = function (models) {
    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Review.belongsTo(models.Skill, {
      foreignKey: {
        allowNull: false
      }
    });
  };  

  return Review;
};

