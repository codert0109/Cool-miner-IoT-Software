module.exports = (sequelize, Sequelize) => {
  const Alert = sequelize.define("alert", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    address: {
      type : Sequelize.STRING
    },
    nft_id : {
      type : Sequelize.INTEGER
    },
    type : {
      type : Sequelize.INTEGER
    },
    level : {
      type : Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at : {
      type: Sequelize.DATE
    }
  });

  return Alert;
};
