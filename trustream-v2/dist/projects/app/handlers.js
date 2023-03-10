"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const env_1 = require("@config/env");
var ethUtil = require('ethereumjs-util');
var bops = require('bops');
function buf2hex(buffer) {
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}
async function verifyMessage(address, nft_id, sessionID) {
    try {
        let result = await models_1.nftAuthRepository.findOne({ where: { address, nft_id, session_id: sessionID } });
        if (result === null)
            return false;
        return true;
    }
    catch (err) {
        console.log(`errors occured in verifyMessage ${err}`);
        return false;
    }
}
async function updateLocationTimestamp(location_id) {
    if (location_id === '' || location_id.length < 3)
        return false;
    if (location_id[0] !== 'P')
        return false;
    let table_id = parseInt(location_id[1]);
    let camera_id = parseInt(location_id.slice(2));
    if (table_id < 1)
        return false;
    --table_id;
    if (table_id >= models_1.P.length)
        return false;
    try {
        await models_1.P[table_id].update({ timestamp: Math.floor(Date.now() / 1000) }, { where: { id: camera_id } });
    }
    catch (err) {
        console.log('errors occured', err);
        return false;
    }
    return true;
}
function getCurrentEpoch() {
    return ~~(Date.now() / 3600 / 1000);
}
let upload_time_table = new Map();
async function updateUpTime(address, nftID) {
    const UPLOAD_INTERVAL = 5 * 60;
    const UPLOAD_THRESMS = UPLOAD_INTERVAL * 1000 * 0.9;
    try {
        let result = await models_1.deviceDataRepository.findOne({
            where: { address, nft_id: nftID },
            order: [['upload_time', 'DESC']]
        });
        if (result !== null) {
            let elapsedTime = Date.now() - new Date(result.upload_time).getTime();
            if (elapsedTime < 0)
                elapsedTime = 0;
            if (elapsedTime < UPLOAD_THRESMS) {
                console.log('blocked: data is uploading too fast.');
                return false;
            }
        }
        if (upload_time_table.get(address) == undefined) {
            upload_time_table.set(address, new Map());
        }
        let cache_upload_time = upload_time_table.get(address).get(nftID);
        if (cache_upload_time != undefined) {
            let elapsedTime = Date.now() - new Date(cache_upload_time).getTime();
            if (elapsedTime < 0)
                elapsedTime = 0;
            if (elapsedTime < UPLOAD_THRESMS) {
                console.log(`blocked: data is uploading too fast. blocked by cache(${elapsedTime})`);
                return false;
            }
        }
        console.log({ cache_upload_time });
        upload_time_table.get(address).set(nftID, Date.now());
        let current_epoch = getCurrentEpoch();
        let upload_record = await models_1.deviceUptimeRepository.findOne({ where: { address, epoch: current_epoch, nft_id: nftID } });
        console.log('upload_record', upload_record);
        if (upload_record === null) {
            await models_1.deviceUptimeRepository.create({
                address,
                uptime: UPLOAD_INTERVAL,
                nft_id: nftID,
                epoch: current_epoch,
                multiplier: 0,
                reward: '0'
            });
        }
        else {
            await models_1.deviceUptimeRepository.update({
                address,
                uptime: upload_record.uptime + UPLOAD_INTERVAL,
                epoch: current_epoch,
                nft_id: nftID,
                multiplier: 0,
                reward: '0'
            }, { where: { address, epoch: current_epoch, nft_id: nftID } });
        }
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
async function checkVersion(msg_version) {
    if (msg_version == null || msg_version == undefined)
        return false;
    let min_version = '2.1.3';
    try {
        let data = await models_1.keystatusRepository.findOne({ where: { key: 'REQUIRED_VERSION' } });
        if (data !== null) {
            min_version = data.value;
        }
        else {
            min_version = '1.0.0';
        }
    }
    catch (err) {
        console.error(err);
        return false;
    }
    let a = min_version.split('.');
    let b = msg_version.split('.');
    for (let i = 0; i < 3; i++) {
        let av = ~~a[i];
        let bv = ~~b[i];
        console.log({ i, av, bv });
        if (av > bv)
            return false;
        if (av < bv)
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
    if (!await checkVersion(decodedPayload.message.version)) {
        console.log("Discard message with version error, ", decodedPayload.message.version);
        return;
    }
    const message = JSON.stringify(decodedPayload.message);
    const signature = decodedPayload.signature;
    let isValid = false;
    let nftID = decodedPayload.message.nftID;
    if (nftID === undefined) {
        console.log(`WARNING: Dropping data message: message does not include NFT ID.`);
        return;
    }
    let location_id = decodedPayload.message.location_id;
    if (location_id === undefined) {
        console.log(`WARNING: Dropping data message: message does not include location_id.`);
        return;
    }
    isValid = await verifyMessage(address, nftID, signature);
    if (isValid === false) {
        console.log('WARNING: Dropping data message: Invalid session id', { address, nftID });
        return;
    }
    isValid = await updateLocationTimestamp(location_id);
    if (isValid === false) {
        console.log(`WARNING: Dropping data message: location_id is invalid ${location_id}`);
        return;
    }
    let result = true;
    if (nftID !== undefined) {
        result = await updateUpTime(address, nftID);
    }
    else {
        nftID = -1;
        console.log(`WARNING: Dropping data message: message does not include NFT ID.`);
        return null;
    }
    if (result == true) {
        let list = [
            { field: 'TOTAL_CARS', value: decodedPayload.message.cars },
            { field: 'TOTAL_TRUCKS', value: decodedPayload.message.truck },
            { field: 'TOTAL_PEDESTRIANS', value: decodedPayload.message.pedestrians },
            { field: 'TOTAL_BUSES', value: decodedPayload.message.bus },
            { field: 'TOTAL_EVENTS', value: decodedPayload.message.total },
        ];
        for (let i = 0; i < list.length; i++) {
            await models_1.keystatusRepository.sequelize?.query(`UPDATE "${env_1.DB_SCHEMA}"."key_statuses" SET value = CAST((CAST(value AS INT) + ${list[i].value}) AS VARCHAR) WHERE key = '${list[i].field}'`);
        }
        await models_1.deviceDataRepository.upsert({
            address: address,
            start_time: decodedPayload.message.start_time,
            end_time: decodedPayload.message.end_time,
            pedestrians: decodedPayload.message.pedestrians,
            cars: decodedPayload.message.cars,
            buses: decodedPayload.message.bus,
            trucks: decodedPayload.message.truck,
            total: decodedPayload.message.total,
            location_id: decodedPayload.message.location_id,
            upload_time: Date.now(),
            nft_id: nftID
        });
    }
}
const handlers = {
    onMqttData,
};
exports.default = handlers;
//# sourceMappingURL=handlers.js.map