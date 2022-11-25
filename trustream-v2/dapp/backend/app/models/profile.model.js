module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define("profile", {
    address: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    setting: {
      type: Sequelize.STRING(65536) // this should be large since it stored json object
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  });

  return Profile;
};
