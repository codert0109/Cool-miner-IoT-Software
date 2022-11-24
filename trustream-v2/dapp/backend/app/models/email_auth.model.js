module.exports = (sequelize, Sequelize) => {
  const Email_Auth = sequelize.define("email_auth", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type : Sequelize.STRING
    },
    code : {
      type : Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at : {
      type: Sequelize.DATE
    }
  });

  return Email_Auth;
};
