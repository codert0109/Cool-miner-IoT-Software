"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = void 0;
const koa_body_1 = __importDefault(require("koa-body"));
function body(opts) {
    return koa_body_1.default({
        includeUnparsed: true,
        multipart: true,
        formidable: {
            maxFieldsSize: 10 * 1024 * 1024,
        },
    });
}
exports.body = body;
//# sourceMappingURL=body.middleware.js.map