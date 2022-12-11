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
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const node_cron_1 = __importDefault(require("node-cron"));
const fs_1 = __importDefault(require("fs"));
const yaml_1 = __importDefault(require("yaml"));
const utils_1 = require("@common/utils");
const index_1 = require("@helpers/index");
const env_1 = require("@config/env");
const exceptions_1 = require("@common/exceptions");
const enums_1 = require("@common/enums");
const mqtt_1 = require("./mqtt");
const privateKeyToAddress = require('ethereum-private-key-to-address');
const ethHelper = new index_1.EthHelper(env_1.ETH_ENDPOINT);
const web3 = ethHelper.web3;
class Project {
    constructor(name, handlers) {
        this.name = name;
        this.handlers = handlers;
        this.listen_lock = false;
        this.useMqtt = false;
        this.useBlockchain = false;
        this.port = null;
        this.mqtt = null;
        this.contractEvents = [];
        this.templateEvents = [];
        this.mqttEvents = null;
        this.privatekey = '';
        this.host = '';
        this.loadConfig();
    }
    loadConfig() {
        const { name, handlers } = this;
        const file = fs_1.default.readFileSync(path_1.default.join(__dirname, `../../dist/projects/${name}/project.yaml`), 'utf8');
        const c = yaml_1.default.parse(file);
        this.useMqtt = c.features.includes('mqtt');
        this.useBlockchain = c.features.includes('blockchain');
        this.port = c.port;
        if (this.useBlockchain) {
            const ce = c.dataSources.filter((v) => v.kind == 'ethereum/contract');
            const normalCe = ce.filter((v) => !lodash_1.default.isNil(v.source.address));
            this.contractEvents = normalCe.map((v) => {
                const abi = require(path_1.default.join(__dirname, `../../dist/projects/${name}/abis/${v.source.abi}.json`)).abi;
                const contract = new web3.eth.Contract(abi, v.source.address);
                const events = v.eventHandlers?.map((x) => ({
                    name: x.event,
                    handler: handlers[x.handler]
                }));
                return {
                    name: v.name,
                    contract,
                    events
                };
            });
            const templateCe = ce.filter((v) => lodash_1.default.isNil(v.source.address));
            const te = [];
            templateCe.forEach((v) => {
                v.eventHandlers.forEach((x) => te.push({ name: x.event, handler: handlers[x.handler] }));
            });
            this.templateEvents = te;
        }
        if (this.useMqtt) {
            const me = c.dataSources.find((v) => v.kind == 'mqtt');
            this.mqttEvents = {
                topics: me.topics,
                handlers: me.handlers.map((v) => ({
                    topicReg: new RegExp(v.topicReg),
                    handler: handlers[v.handler]
                }))
            };
        }
        this.privatekey = c.host.privatekey;
        this.host = privateKeyToAddress(this.privatekey);
    }
    getContract(name) {
        return this.contractEvents.find(v => v.name == name)?.contract;
    }
    async catchUp() {
        let from = await this.getTip();
        try {
            const last = await web3.eth.getBlockNumber();
            utils_1.logger.info(`catchUp start at: ${from}, end at: ${last}`);
            console.log(`catchUp start at: ${from}, end at: ${last}`);
            from++;
            while (from < last) {
                const to = lodash_1.default.min([from + 10, last]) || 0;
                await this.scanBlocks(from, to);
                from = to + 1;
            }
            utils_1.logger.info(`catchUp end at ${from}`);
            console.log(`catchUp end at ${from}`);
        }
        catch (e) {
            utils_1.logger.error(e.toString());
        }
    }
    async listen() {
        const step = 100;
        try {
            const block_id = await this.getTip();
            const blockIndex = block_id + 1;
            let id = await web3.eth.getBlockNumber();
            id--;
            if (id < blockIndex)
                return;
            id = lodash_1.default.min([id, blockIndex + step - 1]) || 0;
            await this.scanBlocks(blockIndex, id);
        }
        catch (e) {
            utils_1.logger.error(e.toString());
        }
    }
    async scanBlocks(fromBlock, toBlock) {
        console.log(`indexing from: ${fromBlock}, to: ${toBlock}`);
        const self = this;
        for (let i = 0; i < this.contractEvents.length; i++) {
            const { contract, events: es } = this.contractEvents[i];
            const events = await contract.getPastEvents('allEvents', {
                fromBlock,
                toBlock
            });
            for (let j = 0; j < events.length; j++) {
                const { transactionHash: hash, event } = events[j];
                const e = lodash_1.default.find(es, v => v.name == event);
                if (!e)
                    continue;
                utils_1.logger.info(`got event ${event}`);
                console.log(`got event ${event}`);
                await e.handler(self, events[j]);
            }
        }
        const te = this.templateEvents;
        if (te.length > 0) {
            for (let i = 0; i < te.length; i++) {
                const { name, handler } = te[i];
                const events = await web3.eth.getPastLogs({
                    fromBlock,
                    toBlock,
                    topics: [name]
                });
                for (let j = 0; j < events.length; j++) {
                    await handler(self, events[j]);
                }
            }
        }
        await this.saveTip(toBlock);
    }
    async startMqtt() {
        if (!this.mqttEvents)
            throw new exceptions_1.Exception(enums_1.Code.BAD_PARAMS, 'mqttEvents undefined');
        const mt = new mqtt_1.Mqtt('pebble', this, this.mqttEvents);
        await mt.start();
        return mt;
    }
    async startBlockchain() {
        const self = this;
        await this.catchUp();
        node_cron_1.default.schedule('*/5 * * * * *', async () => await self.listen(), { timezone: 'Asia/Shanghai' }).start();
    }
    async portOpen() {
        var net = require('net');
        var server = net.createServer();
        if (this.port !== null) {
            server.listen(this.port);
        }
    }
    async run() {
        if (this.useMqtt)
            this.mqtt = await this.startMqtt();
        this.portOpen();
    }
}
__decorate([
    index_1.tryLock('listen_lock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Project.prototype, "listen", null);
exports.default = Project;
//# sourceMappingURL=project.js.map