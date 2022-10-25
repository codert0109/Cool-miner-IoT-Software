module.exports = (sequelize, Sequelize) => {
  const Epoch = sequelize.define("epoch", {
    epoch : {
      type : Sequelize.INTEGER
    },
    duration : {
      type : Sequelize.INTEGER
    },
    miner : {
      type : Sequelize.INTEGER
    },
    weight : {
      type : Sequelize.INTEGER
    },
    reward: {
      type: Sequelize.DATE
    }
  }, {
    uniqueKeys: {
      actions_unique: {
          fields: ['epoch']
      }
    }
  });
  return Epoch;
};
