"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
const os_1 = __importDefault(require("os"));
const koa_1 = __importDefault(require("koa"));
const http_1 = __importDefault(require("http"));
const logger_1 = require("./logger");
const index_1 = require("@helpers/index");
const index_2 = require("@middlewares/index");
function listen(project, port, routers) {
    const app = new koa_1.default();
    app.keys = ['6fd1de93-812b-4e3a-a4b6-b04d8136a8da'];
    app.use(index_2.logger());
    app.use(index_2.realIp());
    app.use(index_2.body());
    app.use(index_2.cors());
    app.use(index_1.handleRouter(routers).routes());
    const server = http_1.default.createServer(app.callback());
    server.keepAliveTimeout = 0;
    server.headersTimeout = 0;
    server.listen(port, 65535, () => {
        logger_1.logger.info(`${project} server start, hostname: ${os_1.default.hostname()}, port: ${port}`);
        console.log(`${project} server start, hostname: ${os_1.default.hostname()}, port: ${port}`);
    });
}
exports.listen = listen;
//# sourceMappingURL=listen.js.map