"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
var ethUtil = require('ethereumjs-util');
var bops = require('bops');
const eth_sig_util_1 = require("eth-sig-util");
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
function verifyMessage(from, signature) {
    const message = 'Very Message Such Wow';
    try {
        const msg = "0x86,101,114,121,32,77,101,115,115,97,103,101,32,83,117,99,104,32,87,111,119";
        const recoveredAddr = eth_sig_util_1.recoverPersonalSignature({ data: msg, sig: signature, });
        console.log('recoveredAddr : ' + recoveredAddr);
        if (recoveredAddr.toLowerCase() === from.toLowerCase()) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.error(err);
        return false;
    }
    return false;
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
    let isValid = false;
    isValid = verifyMessage(address, signature);
    if (isValid === false) {
        console.log(`WARNING: Dropping data message: Invalid signature. Recovered address doesn't match ${address}`);
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
    console.log(`Message Data: ${decodedPayload.message}`);
    console.log(`Timestamp: ${decodedPayload.message.timestamp}`);
    await models_1.deviceDataRepository.upsert({
        id: address + '-' + decodedPayload.message.timestamp,
        address: address,
        timestamp: decodedPayload.message.timestamp,
        pedestrains: decodedPayload.message.pedestrains,
        cars: decodedPayload.message.cars,
        bus: decodedPayload.message.bus,
        truck: decodedPayload.message.truck,
        total: decodedPayload.message.total,
        city: decodedPayload.message.city,
        region: decodedPayload.message.region,
        postalcode: decodedPayload.message.postalcode,
        country: decodedPayload.message.country,
        continent: decodedPayload.message.continent,
        coordinates: decodedPayload.message.coordinates
    });
}
const handlers = {
    onDeviceRegistered,
    onMqttData,
};
exports.default = handlers;
//# sourceMappingURL=handlers.js.map