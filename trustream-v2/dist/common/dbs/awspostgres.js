"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const path_1 = __importDefault(require("path"));
const env_1 = require("@config/env");
function getDB(project) {
    console.log(`[DB] Connecting to ${project}, DB: ${env_1.DB_HOST}, DB_PORT: ${env_1.DB_PORT}, DB_USERNAME: ${env_1.DB_USERNAME}, DB_PASSWORD: ${env_1.DB_PASSWORD}, DB_NAME: ${env_1.DB_NAME}`);
    return new sequelize_typescript_1.Sequelize({
        dialect: 'postgres',
        host: env_1.DB_HOST,
        port: env_1.DB_PORT,
        database: env_1.DB_NAME,
        username: env_1.DB_USERNAME,
        password: env_1.DB_PASSWORD,
        models: [path_1.default.join(__dirname, `../../projects/${project}/models/**/*.model.js`)],
        modelMatch: (filename, member) => {
            const name = filename.replace('.model', '_model');
            const model = member
                .replace(/([A-Z])/g, '_$1')
                .toLowerCase()
                .substring(1);
            return name === model;
        },
        define: {
            timestamps: true,
            paranoid: false,
            underscored: true,
            charset: 'utf8',
            schema: project
        },
        pool: {
            max: 15,
            min: 2,
            acquire: 60000,
            idle: 60000,
        },
        dialectOptions: {
            decimalNumbers: true,
            maxPreparedStatements: 100,
            connectTimeout: 60000
        },
        timezone: '+08:00',
        repositoryMode: true,
        logging: env_1.DB_LOG ? console.log : false,
    });
}
exports.getDB = getDB;
//# sourceMappingURL=awspostgres.js.map