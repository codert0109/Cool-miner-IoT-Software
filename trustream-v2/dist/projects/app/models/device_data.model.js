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
exports.DeviceDataModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const base_1 = __importDefault(require("./base"));
let DeviceDataModel = class DeviceDataModel extends base_1.default {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], DeviceDataModel.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false,
        type: sequelize_typescript_1.DataType.STRING(64)
    }),
    __metadata("design:type", String)
], DeviceDataModel.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: true,
        type: sequelize_typescript_1.DataType.STRING(64)
    }),
    __metadata("design:type", String)
], DeviceDataModel.prototype, "miner", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", Number)
], DeviceDataModel.prototype, "epoch_creation_time", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", Number)
], DeviceDataModel.prototype, "pedestrians", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", Number)
], DeviceDataModel.prototype, "cars", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", Number)
], DeviceDataModel.prototype, "buses", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", Number)
], DeviceDataModel.prototype, "trucks", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", Number)
], DeviceDataModel.prototype, "total", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", String)
], DeviceDataModel.prototype, "link", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", Date)
], DeviceDataModel.prototype, "upload_time", void 0);
DeviceDataModel = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'device_data',
        timestamps: false
    })
], DeviceDataModel);
exports.DeviceDataModel = DeviceDataModel;
//# sourceMappingURL=device_data.model.js.map