module.exports = (sequelize, Sequelize) => {
  const Claim = sequelize.define("claim", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    address: {
      type : Sequelize.STRING
    },
    token : {
      type : Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at : {
      type: Sequelize.DATE
    }
  });

  return Claim;
};
