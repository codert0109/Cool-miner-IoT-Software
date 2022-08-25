"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRepository = exports.statusRepository = exports.deviceUptimeRepository = exports.deviceAuthRepository = exports.deviceDataRepository = exports.db = void 0;
const awspostgres_1 = require("@common/dbs/awspostgres");
const device_data_model_1 = require("./device_data.model");
const device_auth_model_1 = require("./device_auth.model");
const device_uptime_model_1 = require("./device_uptime.model");
const status_model_1 = require("./status.model");
const device_model_1 = require("./device.model");
const env_1 = require("@config/env");
exports.db = awspostgres_1.getDB(env_1.PROJECT);
exports.deviceDataRepository = exports.db.getRepository(device_data_model_1.DeviceDataModel);
exports.deviceAuthRepository = exports.db.getRepository(device_auth_model_1.DeviceAuthModel);
exports.deviceUptimeRepository = exports.db.getRepository(device_uptime_model_1.DeviceUptimeModel);
exports.statusRepository = exports.db.getRepository(status_model_1.StatusModel);
exports.deviceRepository = exports.db.getRepository(device_model_1.DeviceModel);
//# sourceMappingURL=index.js.map