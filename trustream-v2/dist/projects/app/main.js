"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_init_1 = require("../../common/utils/process_init");
process_init_1.process_init();
const models_1 = require("./models");
const project_1 = __importDefault(require("../project"));
const handlers_1 = __importDefault(require("./handlers"));
const env_1 = require("@config/env");
class App extends project_1.default {
    constructor() {
        super(env_1.PROJECT, handlers_1.default);
    }
    async getTip() {
        let row = await models_1.statusRepository.findByPk(1);
        return (row?.value || 0);
    }
    async saveTip(value) {
        const [rows] = await models_1.statusRepository.update({
            value
        }, {
            where: { id: 1 }
        });
        return rows === 1;
    }
}
if (require.main === module) {
    const app = new App();
    app.run();
}
//# sourceMappingURL=main.js.map