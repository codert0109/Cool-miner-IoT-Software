module.exports = (sequelize, Sequelize) => {
  const Device_Data = sequelize.define("device_data", {
    address: {
      type : Sequelize.STRING
    },
    session_id: {
      type : Sequelize.STRING
    },
    nounce : {
      type : Sequelize.STRING
    },
    session_start : {
      type : Sequelize.DATE
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at : {
      type: Sequelize.DATE
    }
  });

  return Device_Data;
};
