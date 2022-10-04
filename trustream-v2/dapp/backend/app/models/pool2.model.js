module.exports = (sequelize, Sequelize) => {
  const Pool2 = sequelize.define("pool2", {
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

  return Pool2;
};
