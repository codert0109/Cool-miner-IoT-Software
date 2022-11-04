module.exports = (sequelize, Sequelize) => {
  const Epoch = sequelize.define("epoch", {
    epoch : {
      type : Sequelize.INTEGER
    },
    duration : {
      type : Sequelize.INTEGER
    },
    miner : {                             // the total number of miners
      type : Sequelize.INTEGER
    },
    weight : {
      type : Sequelize.INTEGER
    },
    reward: {
      type: Sequelize.STRING
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
