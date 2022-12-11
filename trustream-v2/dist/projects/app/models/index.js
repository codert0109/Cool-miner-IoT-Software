"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P = exports.keystatusRepository = exports.cameraRepository = exports.nftAuthRepository = exports.statusRepository = exports.deviceUptimeRepository = exports.portalAuthRepository = exports.deviceDataRepository = exports.db = void 0;
const awspostgres_1 = require("@common/dbs/awspostgres");
const device_data_model_1 = require("./device_data.model");
const portal_auth_model_1 = require("./portal_auth.model");
const nft_auth_model_1 = require("./nft_auth.model");
const device_uptime_model_1 = require("./device_uptime.model");
const status_model_1 = require("./status.model");
const env_1 = require("@config/env");
const camera_model_1 = require("./camera.model");
const p1_model_1 = require("./p1.model");
const p2_model_1 = require("./p2.model");
const p3_model_1 = require("./p3.model");
const key_status_model_1 = require("./key_status.model");
exports.db = awspostgres_1.getDB(env_1.PROJECT);
exports.deviceDataRepository = exports.db.getRepository(device_data_model_1.DeviceDataModel);
exports.portalAuthRepository = exports.db.getRepository(portal_auth_model_1.PortalAuthModel);
exports.deviceUptimeRepository = exports.db.getRepository(device_uptime_model_1.DeviceUptimeModel);
exports.statusRepository = exports.db.getRepository(status_model_1.StatusModel);
exports.nftAuthRepository = exports.db.getRepository(nft_auth_model_1.NftAuthModel);
exports.cameraRepository = exports.db.getRepository(camera_model_1.CameraModel);
exports.keystatusRepository = exports.db.getRepository(key_status_model_1.KeyStatusModel);
exports.P = [
    exports.db.getRepository(p1_model_1.P1Model),
    exports.db.getRepository(p2_model_1.P2Model),
    exports.db.getRepository(p3_model_1.P3Model),
];
//# sourceMappingURL=index.js.map