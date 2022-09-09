module.exports = (sequelize, Sequelize) => {
  const Device_Data = sequelize.define("device_data", {
    // id : {
    //   type : Sequelize.STRING
    // },
    address: {
      type : Sequelize.STRING
    },
    miner: {
      type : Sequelize.STRING
    },
    epoch_creation_time: {
      type : Sequelize.DATE
    },
    pedestrians: {
      type : Sequelize.INTEGER
    },
    cars: {
      type : Sequelize.INTEGER
    },
    buses: {
      type : Sequelize.INTEGER
    },
    trucks: {
      type : Sequelize.INTEGER
    },
    total: {
      type : Sequelize.INTEGER
    },
    link: {
      type : Sequelize.STRING
    },
    createdAt : true,
    updatedAt : false
  });

  return Device_Data;
};
