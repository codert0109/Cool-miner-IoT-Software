"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQTT_NODE = exports.CA = exports.TLS_CERT = exports.TLS_KEY = exports.TLS_ENABLED = exports.ETH_ENDPOINT = exports.DB_LOG = exports.LOG_LEVEL = exports.WORKER_QUEUE = exports.SYSLOG_TAG = exports.SYSLOG_PROTOCOL = exports.SYSLOG_PORT = exports.SYSLOG_HOST = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.DB_DIALECT = exports.PROJECT = exports.NODE_ENV = void 0;
const lodash_1 = __importDefault(require("lodash"));
const { env } = process;
const get = (name, _default = '') => {
    return lodash_1.default.get(env, name, _default);
};
const getNumber = (name, _default = 0) => {
    const n = get(name);
    const num = (!lodash_1.default.isNil(n) && !lodash_1.default.isEmpty(n)) ? lodash_1.default.toNumber(n) : undefined;
    return lodash_1.default.defaultTo(num, _default);
};
exports.NODE_ENV = env.NODE_ENV;
exports.PROJECT = get('PROJECT', 'app');
exports.DB_DIALECT = get('DB_DIALECT', 'postgres');
exports.DB_HOST = get('DB_HOST', '127.0.0.1');
exports.DB_PORT = getNumber('DB_PORT', 5432);
exports.DB_USERNAME = get('DB_USERNAME', 'postgres');
exports.DB_PASSWORD = get('DB_PASSWORD', 'admin');
exports.DB_NAME = get('DB_NAME', "datalayerdb");
exports.SYSLOG_HOST = get('SYSLOGD_HOST');
exports.SYSLOG_PORT = getNumber('SYSLOGD_PORT', 514);
exports.SYSLOG_PROTOCOL = get('SYSLOGD_PROTOCOL', 'U');
exports.SYSLOG_TAG = get('SYSLOGD_TAG', `${exports.PROJECT}`);
exports.WORKER_QUEUE = get('WORKER_QUEUE', `${exports.PROJECT}q`);
exports.LOG_LEVEL = get('LOG_LEVEL', 'error');
exports.DB_LOG = getNumber('DB_LOG', 0) > 0;
exports.ETH_ENDPOINT = get('ETH_ENDPOINT');
exports.TLS_ENABLED = get('TLS_ENABLED', 'false');
exports.TLS_KEY = get('TLS_KEY', 'tls-key.pem');
exports.TLS_CERT = get('TLS_CERT', 'tls-cert.pem');
exports.CA = get('CA', 'root.pem');
exports.MQTT_NODE = get('MQTT_NODE', 'mqtts://localhost');
//# sourceMappingURL=env.js.map