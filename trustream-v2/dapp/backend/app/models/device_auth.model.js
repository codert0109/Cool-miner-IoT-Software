module.exports = (sequelize, Sequelize) => {
  const Device_Auth = sequelize.define("device_auth", {
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

  return Device_Auth;
};
