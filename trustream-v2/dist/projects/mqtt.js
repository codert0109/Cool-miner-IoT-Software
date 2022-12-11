"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mqtt = exports.createClient = void 0;
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = __importDefault(require("fs"));
const async_mqtt_1 = require("async-mqtt");
const utils_1 = require("@common/utils");
const env_1 = require("@config/env");
async function createClient() {
    let config = {};
    if (env_1.TLS_ENABLED === 'true' || env_1.TLS_ENABLED === 'True') {
        const key = fs_1.default.readFileSync(env_1.TLS_KEY);
        const cert = fs_1.default.readFileSync(env_1.TLS_CERT);
        const ca = fs_1.default.readFileSync(env_1.CA);
        config = {
            key,
            cert,
            ca,
            rejectUnauthorized: true
        };
    }
    try {
        const client = await async_mqtt_1.connectAsync(env_1.MQTT_NODE, config);
        return client;
    }
    catch (e) {
        console.log("Failed to connect to MQTT broker");
        utils_1.logger.error(e.toString());
        return undefined;
    }
}
exports.createClient = createClient;
class Mqtt {
    constructor(module, context, config) {
        this.module = module;
        this.context = context;
        this.config = config;
    }
    async start() {
        const { context } = this;
        const { topics, handlers } = this.config;
        const client = this.client = await createClient();
        if (!client)
            return false;
        client.on('message', async (topic, payload) => {
            try {
                utils_1.logger.info(`topic: ${topic}`);
                const topicHandler = lodash_1.default.find(handlers, v => v.topicReg.test(topic));
                if (topicHandler) {
                    await topicHandler.handler(context, topic, payload);
                }
            }
            catch (e) {
                console.log(e.toString());
            }
        });
        try {
            await client.subscribe(topics, { qos: 0 });
        }
        catch (e) {
            utils_1.logger.error(e.toString());
            return false;
        }
        return true;
    }
    async publish(topic, data) {
        if (typeof (data) == 'object')
            data = JSON.stringify(data);
        try {
            await this.client?.publish(topic, data);
        }
        catch (e) {
            utils_1.logger.error(e.toString());
        }
    }
}
exports.Mqtt = Mqtt;
//# sourceMappingURL=mqtt.js.map