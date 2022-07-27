"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const base_1 = __importDefault(require("./base"));
var deviceStatus;
(function (deviceStatus) {
    deviceStatus[deviceStatus["IS_ENABLED"] = 0] = "IS_ENABLED";
    deviceStatus[deviceStatus["IS_SUSPENDED"] = 1] = "IS_SUSPENDED";
})(deviceStatus || (deviceStatus = {}));
let DeviceModel = class DeviceModel extends base_1.default {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(64)
    }),
    __metadata("design:type", String)
], DeviceModel.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], DeviceModel.prototype, "status", void 0);
DeviceModel = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'device',
        indexes: [
            { name: 'address', fields: ['address'], unique: true }
        ]
    })
], DeviceModel);
exports.DeviceModel = DeviceModel;
//# sourceMappingURL=device.model.js.map