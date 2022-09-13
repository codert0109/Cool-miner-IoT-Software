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
async function updateUpTime(address, nftID) {
    const UPLOAD_INTERVAL = 5 * 60;
    const UPLOAD_THRESMS = 200000;
    console.log('updateUpTime called');
    try {
        let result = await models_1.deviceDataRepository.findOne({ where: { nft_id: nftID }, order: [['upload_time', 'DESC']] });
        if (result === null) {
            await models_1.deviceUptimeRepository.create({ address, uptime: UPLOAD_INTERVAL });
            return true;
        }
        else {
            let elapsedTime = Date.now() - new Date(result.upload_time).getTime();
            console.log('elapsedTime', elapsedTime);
            if (elapsedTime > UPLOAD_THRESMS) {
                let result = await models_1.deviceUptimeRepository.findOne({ where: { address } });
                if (result === null) {
                    await models_1.deviceUptimeRepository.create({ address, uptime: UPLOAD_INTERVAL });
                }
                else {
                    await models_1.deviceUptimeRepository.update({ address, uptime: result.uptime + UPLOAD_INTERVAL }, { where: { address } });
                }
                return true;
            }
            else {
                console.log('blocked: data is uploading too fast.');
                return false;
            }
        }
    }
    catch (err) {
        console.log(`errors occured in updateUpTime ${err}`);
        return false;
    }
}
function checkVersion(min_version = '2.1.3', msg_version) {
    if (msg_version == null || msg_version == undefined)
        return false;
    let a = min_version.split('.');
    let b = msg_version.split('.');
    for (let i = 0; i < 3; i++) {
        if (~~a > ~~b)
            return false;
        if (~~a < ~~b)
            return true;
    }
    return true;
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
    if (!checkVersion('2.1.3', decodedPayload.message.version)) {
        console.log("Discard message with version error, ", decodedPayload.message.version);
        return;
    }
    const message = JSON.stringify(decodedPayload.message);
    console.log('message', message);
    const signature = decodedPayload.signature;
    let isValid = false;
    isValid = await verifyMessage(address, signature);
    if (isValid === false) {
        console.log(`WARNING: Dropping data message: Invalid session id ${address}`);
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
    console.log(`Stop time: ${decodedPayload.message.stop_time}`);
    let { miner } = decodedPayload.message;
    if (miner == undefined)
        miner = 'Not set';
    let nounce = ~~(Math.random() * 100000);
    let nftID = decodedPayload.message.nftID;
    console.log(`NFT ID: ${nftID}`);
    let result = true;
    if (nftID !== undefined) {
        result = await updateUpTime(address, nftID);
    }
    else {
        nftID = -1;
    }
    if (result == true) {
        await models_1.deviceDataRepository.upsert({
            address: address,
            start_time: decodedPayload.message.start_time,
            end_time: decodedPayload.message.stop_time,
            pedestrians: decodedPayload.message.pedestrians,
            cars: decodedPayload.message.cars,
            buses: decodedPayload.message.bus,
            trucks: decodedPayload.message.truck,
            total: decodedPayload.message.total,
            link: decodedPayload.message.link,
            upload_time: Date.now(),
            miner,
            nft_id: nftID
        });
    }
}
const handlers = {
    onDeviceRegistered,
    onMqttData,
};
exports.default = handlers;
//# sourceMappingURL=handlers.js.map