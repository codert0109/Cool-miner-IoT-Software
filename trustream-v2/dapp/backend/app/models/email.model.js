module.exports = (sequelize, Sequelize) => {
  const Email = sequelize.define("email", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type : Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at : {
      type: Sequelize.DATE
    }
  });

  return Email;
};
