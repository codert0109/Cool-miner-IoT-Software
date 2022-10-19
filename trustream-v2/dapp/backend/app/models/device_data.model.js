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
    start_time: {
      type : Sequelize.DATE
    },
    end_time: {
      type : Sequelize.DATE
    },
    upload_time: {
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
    location_id: {
      type : Sequelize.STRING
    },
    nft_id : {
      type : Sequelize.INTEGER
    }
  }, { 
    timestamps : false,
    createdAt : false,
    updatedAt : false 
  });

  return Device_Data;
};
