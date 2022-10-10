module.exports = (sequelize, Sequelize) => {
  const Key_Status = sequelize.define("key_status", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    key: {
      type : Sequelize.STRING
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
