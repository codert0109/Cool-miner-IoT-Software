module.exports = (sequelize, Sequelize) => {
  const Device_Data = sequelize.define("device_data", {
    // id : {
    //   type : Sequelize.STRING
    // },
    address: {
      type : Sequelize.STRING
    },
    timestamp: {
      type : Sequelize.DATE
    },
    pedestrains: {
      type : Sequelize.INTEGER
    },
    cars: {
      type : Sequelize.INTEGER
    },
    bus: {
      type : Sequelize.INTEGER
    },
    truck: {
      type : Sequelize.INTEGER
    },
    total: {
      type : Sequelize.INTEGER
    },
    link: {
      type : Sequelize.LINK
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
