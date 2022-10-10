const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },

  define: {
    timestamps: true,
    paranoid: false,
    underscored: true,
    charset: 'utf8',
    schema: dbConfig.project
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.device_datas   = require("./device_data.model.js")(sequelize, Sequelize);
db.portal_auth    = require("./portal_auth.model.js")(sequelize, Sequelize);
db.nft_auth       = require("./nft_auth.model.js")(sequelize, Sequelize);
db.device_uptimes = require("./device_uptime.model.js")(sequelize, Sequelize);
db.server_updates = require("./server_update.model.js")(sequelize, Sequelize);
db.claim          = require("./claim.model.js")(sequelize, Sequelize);
db.key_status     = require("./key_status.model.js")(sequelize, Sequelize);
db.cameras        = require("./camera.model.js")(sequelize, Sequelize);

db.P             = require("./p.model.js")(sequelize, Sequelize); //  array of P1, P2, P3 DB table

db.P.forEach((pTable) => {
  db.cameras.hasOne(pTable, {
    foreignKey : 'id'
  });
});

module.exports = db;
