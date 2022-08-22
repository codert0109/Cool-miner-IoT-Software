module.exports = {
  HOST: "database-1.c8hczoahlwk5.us-east-1.rds.amazonaws.com",
  USER: "postgres",
  PASSWORD: "lqUYooZDk7LhMxuV60GR",
  DB: "datalayerdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  project : 'app',

  CENTRAL_WALLET : {
    address : '0x78D0e460f234efbFc235152d32AB5e31b30B2171',
    privateKey : '0xdb8b38c2418be3430951c731f15418207a9e2a32d4da5f485fa868d21a8432f3',
  }
};