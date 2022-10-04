module.exports = (sequelize, Sequelize) => {
  const Camera = sequelize.define("camera", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    coordinates: {
      type : Sequelize.STRING
    },
    link: {
      type : Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at : {
      type: Sequelize.DATE
    }
  });

  return Camera;
};
