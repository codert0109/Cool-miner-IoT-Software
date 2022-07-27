"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const ethereumjs_util_1 = require("ethereumjs-util");
var ethUtil = require('ethereumjs-util');
const utils_1 = require("@common/utils");
async function onDeviceRegistered(context, event) {
    if (event) {
        const { _deviceAddress } = event.returnValues;
        console.log("Registered new device: ", _deviceAddress);
        await models_1.deviceRepository.upsert({
            address: _deviceAddress,
            status: 0
        });
    }
}
function buf2hex(buffer) {
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}
async function onMqttData(context, topic, payload) {
    console.log("Received a message on topic: ", topic);
    const values = /^\/device\/(0x[a-fA-F0-9]{40})\/data$/.exec(topic);
    if (!values) {
        console.log("Invalid topic, ignoring");
        return;
    }
    const address = values[1];
    let decodedPayload = eval('(' + payload.toString() + ')');
    const message = JSON.stringify(decodedPayload.message);
    const signature = decodedPayload.signature;
    console.log('workin test', message, signature);
    const msgHex = ethUtil.bufferToHex(Buffer.from(message));
    const msgBuffer = ethUtil.toBuffer(msgHex);
    const hash = ethUtil.hashPersonalMessage(msgBuffer);
    const sig = Buffer.from(signature, 'base64');
    let isValid = false;
    for (let i = 0; i < 4; i++) {
        const v = 27 + i;
        try {
            let pubkey = '04' + ethereumjs_util_1.ecrecover(hash, v, sig.slice(0, 32), sig.slice(32, 64), 0).toString('hex');
            const recovered = utils_1.publicKeyToAddress(pubkey);
            if (address.toLowerCase() === recovered.toLowerCase()) {
                console.log(`Recovered address: ${recovered}`);
                isValid = true;
                break;
            }
        }
        catch (e) {
            console.log(`ERROR: Dropping message. ${e}`);
            return;
        }
    }
    if (isValid === false) {
        console.log(`WARNING: Dropping data message: Invalid signature. Recovered address doesn't match ${address}`);
    }
    const device = await models_1.deviceRepository.findByPk(address);
    if (!device) {
        console.log(`WARNING: Dropping data message: Device ${address} is not registered`);
        return null;
    }
    console.log("Device is registered. Processing data");
    console.log(`Device address: ${address}`);
    console.log(`Heart rate: ${decodedPayload.message.heartRate}`);
    console.log(`Timestamp: ${decodedPayload.message.timestamp}`);
    await models_1.deviceDataRepository.upsert({
        id: address + '-' + decodedPayload.message.timestamp,
        address: address,
        heartRate: decodedPayload.message.heartRate,
        timestamp: decodedPayload.message.timestamp
    });
}
const handlers = {
    onDeviceRegistered,
    onMqttData,
};
exports.default = handlers;
//# sourceMappingURL=handlers.js.map