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
    city: {
      type : Sequelize.STRING
    },
    region: {
      type : Sequelize.STRING
    },
    postalcode: {
      type : Sequelize.STRING
    },
    country: {
      type : Sequelize.STRING
    },
    continent: {
      type : Sequelize.STRING
    },
    coordinates: {
      type : Sequelize.STRING
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
