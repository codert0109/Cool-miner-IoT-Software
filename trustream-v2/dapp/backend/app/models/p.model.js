const db_config = require('../config/db.config');

module.exports = (sequelize, Sequelize) => {
  let ret = [];
  for (let id = 1; id <= db_config.POOL_DUPLICATE_CNT; id++) {
    let name = `P${id}`;
    const P = sequelize.define(
      name,
      {
        camera_id: {
          type: Sequelize.INTEGER,
          primaryKey : true,
          allowNull : false
        },
        nft_id: {
          type: Sequelize.INTEGER,
        },
        timestamp: {
          type: Sequelize.INTEGER,
        },
      },
      {
        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: name,

        indexes: [{ fields: ['camera_id'] }, { fields: ['nft_id'] }],
      },
    )
    ret.push(P);
  }
  return ret;
}
