"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool1Repository = exports.cameraRepository = exports.nftAuthRepository = exports.statusRepository = exports.deviceUptimeRepository = exports.portalAuthRepository = exports.deviceDataRepository = exports.db = void 0;
const awspostgres_1 = require("@common/dbs/awspostgres");
const device_data_model_1 = require("./device_data.model");
const portal_auth_model_1 = require("./portal_auth.model");
const nft_auth_model_1 = require("./nft_auth.model");
const device_uptime_model_1 = require("./device_uptime.model");
const status_model_1 = require("./status.model");
const env_1 = require("@config/env");
const camera_model_1 = require("./camera.model");
const pool1_model_1 = require("./pool1.model");
exports.db = awspostgres_1.getDB(env_1.PROJECT);
exports.deviceDataRepository = exports.db.getRepository(device_data_model_1.DeviceDataModel);
exports.portalAuthRepository = exports.db.getRepository(portal_auth_model_1.PortalAuthModel);
exports.deviceUptimeRepository = exports.db.getRepository(device_uptime_model_1.DeviceUptimeModel);
exports.statusRepository = exports.db.getRepository(status_model_1.StatusModel);
exports.nftAuthRepository = exports.db.getRepository(nft_auth_model_1.NftAuthModel);
exports.cameraRepository = exports.db.getRepository(camera_model_1.CameraModel);
exports.pool1Repository = exports.db.getRepository(pool1_model_1.Pool1Model);
//# sourceMappingURL=index.js.map