"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
var ethUtil = require('ethereumjs-util');
var bops = require('bops');
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
async function verifyMessage(from, sessionID) {
    try {
        let result = await models_1.deviceAuthRepository.findOne({ where: { address: from, session_id: sessionID } });
        if (result === null)
            return false;
        return true;
    }
    catch (err) {
        console.log(`errors occured in verifyMessage ${err}`);
        return false;
    }
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
    console.log('message', message);
    const signature = decodedPayload.signature;
    let isValid = false;
    isValid = await verifyMessage(address, signature);
    if (isValid === false) {
        console.log(`WARNING: Dropping data message: Invalid signature. Recovered address doesn't match ${address}`);
        return;
    }
    let NFTContract = context.getContract("NFT");
    let NFTBalance = await NFTContract.methods.balanceOf(address).call();
    let hasNFT = parseInt(NFTBalance.normalNFT) > 0;
    if (!hasNFT) {
        console.log('NFTBalance', NFTBalance);
        console.log(`WARNING: Dropping data message: Device ${address} has no NFT.`);
        return null;
    }
    console.log("Device has NFT. Processing data");
    console.log(`Device address: ${address}`);
    console.log(`Timestamp: ${decodedPayload.message.timestamp}`);
    await models_1.deviceDataRepository.upsert({
        id: address + '-' + decodedPayload.message.timestamp,
        address: address,
        timestamp: decodedPayload.message.timestamp,
        pedestrains: decodedPayload.message.pedestrians,
        cars: decodedPayload.message.cars,
        bus: decodedPayload.message.bus,
        truck: decodedPayload.message.truck,
        total: decodedPayload.message.total,
        link: decodedPayload.message.link
    });
}
const handlers = {
    onDeviceRegistered,
    onMqttData,
};
exports.default = handlers;
//# sourceMappingURL=handlers.js.map