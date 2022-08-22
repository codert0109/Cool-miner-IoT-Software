"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const param_validate_middleware_1 = require("@middlewares/param_validate.middleware");
const response_middleware_1 = require("@middlewares/response.middleware");
exports.handleRouter = (routes) => {
    const router = new koa_router_1.default();
    routes.forEach((item) => {
        const { name, path, method, action, middlewares = [], params: schema, isSkip, isAttachment = false } = item;
        if (!isSkip) {
            if (isAttachment) {
                router[method](name, path, ...middlewares, param_validate_middleware_1.paramValidate({ schema }), action);
            }
            else {
                router[method](name, path, ...middlewares, param_validate_middleware_1.paramValidate({ schema }), response_middleware_1.response({ action }));
            }
        }
    });
    return router;
};
//# sourceMappingURL=http.js.map