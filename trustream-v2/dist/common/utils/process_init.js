"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.process_init = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
function process_init() {
    const ma = require('module-alias/register');
    dotenv_1.default.config({ path: '.env' });
}
exports.process_init = process_init;
//# sourceMappingURL=process_init.js.map