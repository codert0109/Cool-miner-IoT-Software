module.exports = (sequelize, Sequelize) => {
  const Device_Uptime = sequelize.define("device_uptime", {
    address: {
      type : Sequelize.STRING
    },
    uptime: {
      type : Sequelize.INTEGER
    },
    epoch : {
      type : Sequelize.INTEGER
    },
    nft_id : {
      type : Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at : {
      type: Sequelize.DATE
    }
  }, {
    uniqueKeys: {
      actions_unique: {
          fields: ['address', 'epoch', 'nft_id']
      }
    }
  });

  return Device_Uptime;
};
