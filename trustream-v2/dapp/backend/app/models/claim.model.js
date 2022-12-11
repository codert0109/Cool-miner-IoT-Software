module.exports = (sequelize, Sequelize) => {
  const Claim = sequelize.define("claim", {
    address: {
      type : Sequelize.STRING,
      primaryKey: true
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
