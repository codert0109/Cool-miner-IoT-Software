module.exports = (sequelize, Sequelize) => {
  const Key_Status = sequelize.define("key_status", {
    key: {
      type : Sequelize.STRING,
      primaryKey: true
    },
    value : {
      type : Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at : {
      type: Sequelize.DATE
    }
  });

  return Key_Status;
};
