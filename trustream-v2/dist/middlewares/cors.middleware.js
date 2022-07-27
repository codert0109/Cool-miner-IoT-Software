"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
const koa2_cors_1 = __importDefault(require("koa2-cors"));
function cors(opts) {
    return koa2_cors_1.default({
        credentials: true,
    });
}
exports.cors = cors;
//# sourceMappingURL=cors.middleware.js.map