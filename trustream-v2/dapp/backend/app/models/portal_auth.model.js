module.exports = (sequelize, Sequelize) => {
  const Portal_Auth = sequelize.define("portal_auth", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
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

  return Portal_Auth;
};
