"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const lodash_1 = __importDefault(require("lodash"));
const winston_1 = require("winston");
const moment_1 = __importDefault(require("moment"));
const env_1 = require("@config/env");
const { combine, printf } = winston_1.format;
const { Rsyslog } = require('winston-rsyslog');
const { env } = process;
const host = env.SYSLOGD_HOST || '';
const port = Number(env.SYSLOGD_PORT) || 514;
const protocol = env.SYSLOGD_PROTOCOL || 'U';
const tag = env.SYSLOGD_TAG || env_1.PROJECT;
const timestamp = () => moment_1.default().format('YYYY-MM-DD HH:mm:ss');
const trans = [new winston_1.transports.Console()];
if (!lodash_1.default.isEmpty(host))
    trans.push(new Rsyslog({ host, port, protocol, tag }));
const logger = winston_1.createLogger({
    level: env_1.LOG_LEVEL,
    format: combine(printf(info => `[${timestamp()}] ${info.level} ${info.message}`)),
    transports: trans
});
exports.logger = logger;
//# sourceMappingURL=logger.js.map