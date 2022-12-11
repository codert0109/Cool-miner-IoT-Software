module.exports = (sequelize, Sequelize) => {
  const server_update = sequelize.define("server_update", {
    id : {
      type : Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    version: {
      type : Sequelize.STRING
    },
    message: {
      type : Sequelize.STRING
    },
    note : {
      type : Sequelize.STRING
    },
    download : {
      type : Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    }
  });

  return server_update;
};
