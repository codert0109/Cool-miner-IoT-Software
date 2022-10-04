module.exports = (sequelize, Sequelize) => {
  const Pool1 = sequelize.define("pool1", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    camera_id: {
      type: Sequelize.INTEGER,
    },
    used: {
      type : Sequelize.STRING
    },
    status: {
      type : Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at : {
      type: Sequelize.DATE
    }
  });

  return Pool1;
};
