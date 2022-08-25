module.exports = (sequelize, Sequelize) => {
  const Device_Uptime = sequelize.define("device_uptime", {
    address: {
      type : Sequelize.STRING
    },
    uptime: {
      type : Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at : {
      type: Sequelize.DATE
    }
  });

  return Device_Uptime;
};
