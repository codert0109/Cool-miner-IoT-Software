const EPOCH_INTERVAL_SECONDS = 1 * 60 * 60;             // 3600s = 1h
const EPOCH_INTERVAL = EPOCH_INTERVAL_SECONDS * 1000;   // 3600s = 1h
const TIMER_INTERVAL = 5000;
const DISTRIBUTION_AMOUNT = 2000;

const key_status = require('../controllers/key_status.controller');
const device_uptime = require('../controllers/device_uptime.controller');
const claim_controller = require('../controllers/claim_token.controller');

const { updateClaimToken } = claim_controller;
const { getMultiplier } = require('../controllers/staking.controller');

let timerID = null;
let isPending = false;

const onResult = async () => {
    if (isPending) return;

    // hh:mm:ss the minute should be bigger than > 10.
    // This is necessary because the miners is uploading data in 0~5min randomly.
    // So we need to give them 10m to submit the data.
    if (new Date().getUTCMinutes() < 10) 
        return;

    try {
        isPending = true;

        let result = await key_status.getValue('LAST_UPDATED_EPOCH');
        
        let last_updated = 0;
        if (result != null) 
            last_updated = parseInt(result.value);

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

        console.log('<=============== CLAIM SERVICE START ===============>');
        console.log({
            'Epoch' : last_epoch, 
            'Time:' : new Date().toString()
        });
                
        await key_status.updateValue('LAST_UPDATED_EPOCH', last_epoch);

        let deviceUpTimeData = await device_uptime.getAll({
            epoch : last_epoch
        });

        for (let i = 0; i < deviceUpTimeData.length; i++) {
            let multiplier = await getMultiplier(deviceUpTimeData[i].address);
            console.log('Address:',     deviceUpTimeData[i].address, 
                        'NFT:',         deviceUpTimeData[i].nft_id,
                        'Multiplier:',  multiplier,
                        'UpTime:',      deviceUpTimeData[i].uptime);
            let uptime = Math.min(EPOCH_INTERVAL_SECONDS, deviceUpTimeData[i].uptime);
            uptime *= multiplier;
            deviceUpTimeData[i].uptime = uptime;
        }

        let totUptime = 0;

        for (let i = 0; i < deviceUpTimeData.length; i++) 
            totUptime += deviceUpTimeData[i].uptime;

        console.log('TotUpTime:', totUptime);

        for (let i = 0; i < deviceUpTimeData.length; i++) {
            let curReward;
            if (totUptime == 0) {
                curReward = 0;
            } else {
                curReward =   DISTRIBUTION_AMOUNT * deviceUpTimeData[i].uptime / totUptime;
            }

            curReward = ~~curReward;

            console.log('Address:', deviceUpTimeData[i].address,
                        'NFT:',     deviceUpTimeData[i].nft_id,
                        'Reward:',  curReward);

            let ret = await updateClaimToken(deviceUpTimeData[i].address, curReward);
            if (ret.status == 'ERR') {
                console.error('errors in updatimg claim token', { 
                    address : deviceUpTimeData[i].address,
                    amount : curReward
                });
                continue;
            }
        }

        console.log('<=============== CLAIM SERVICE END ===============>');

        isPending = false;
    } catch (err) {
        console.error('errors occured in claim.service', err);
        isPending = false;
        return;
    }
};

exports.init = function() {
    if (timerID != null) {
        console.log('claim.service is already running');
        return;
    }
    
    const workLoop = async () => {
        await onResult();
        setTimeout(() => {
            workLoop();
        }, TIMER_INTERVAL);
    };

    workLoop();
    console.log('Claim Service started');
};