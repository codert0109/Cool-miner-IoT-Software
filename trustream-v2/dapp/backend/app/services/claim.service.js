const EPOCH_INTERVAL_SECONDS = 1 * 60 * 60;             // 3600s = 1h
const EPOCH_INTERVAL = EPOCH_INTERVAL_SECONDS * 1000;   // 3600s = 1h
const TIMER_INTERVAL = 5000;
const DISTRIBUTION_AMOUNT = 2000;

const key_status = require('../controllers/key_status.controller');
const device_uptime = require('../controllers/device_uptime.controller');
const { web3, updateClaimToken } = require('../controllers/claim_token.controller');

let timerID = null;
let isPending = false;

const onResult = async () => {
    if (isPending) return;

    try {
        isPending = true;

        let result = await key_status.getValue('LAST_UPDATED_EPOCH');
        let last_updated = 0;
        if (result != null) last_updated = parseInt(result.value);

        let cur_epoch = ~~ (Date.now() / EPOCH_INTERVAL);
        if (cur_epoch <= 0) {
            isPending = false;
            return;
        }

        let last_epoch = cur_epoch - 1;

        if (last_epoch == last_updated) {     // no need to work
            isPending = false;
            return;
        }
        
        await key_status.updateValue('LAST_UPDATED_EPOCH', last_epoch);

        let deviceUpTimeData = await device_uptime.getAll({
            epoch : last_epoch
        });

        let totUptime = 0;
        for (let i = 0; i < deviceUpTimeData.length; i++) {
            totUptime += Math.min(EPOCH_INTERVAL_SECONDS, deviceUpTimeData[i].uptime)
        }

        for (let i = 0; i < deviceUpTimeData.length; i++) {
            let curReward =   DISTRIBUTION_AMOUNT * 
                                Math.min(
                                    EPOCH_INTERVAL_SECONDS, 
                                    deviceUpTimeData[i].uptime
                                ) / totUptime;
            curReward = ~~curReward;

            let ret = await updateClaimToken(deviceUpTimeData[i].address, curReward);

            if (ret == false) {
                console.log('errors in updatimg claim token', { 
                    address : deviceUpTimeData[i].address,
                    amount : curReward
                });
            }
        }
        isPending = false;
    } catch (err) {
        console.log('errors occured in claim.service', err);
        isPending = false;
        return;
    }
};

exports.init = function() {
    if (timerID != null) {
        console.log('claim.service is already running');
        return;
    }
    timerID = setInterval(onResult, TIMER_INTERVAL);
};